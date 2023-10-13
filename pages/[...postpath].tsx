import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const endpoint = process.env.GRAPHQL_ENDPOINT as string;
	const graphQLClient = new GraphQLClient(endpoint);
	const referringURL = ctx.req.headers?.referer || null;
	const pathArr = ctx.query.postpath as Array<string>;
	const path = pathArr.join('/');
	console.log(path);
	const fbclid = ctx.query.fbclid;

	// redirect if facebook is the referer or request contains fbclid
	if (referringURL?.includes('facebook.com') || fbclid) {
		return {
			redirect: {
				permanent: false,
				destination: `${
					endpoint.replace(/(\/graphql\/)/, '/') + encodeURI(path as string)
				}`,
			},
		};
	}
	const query = gql`
		{
			post(id: "/${path}/", idType: URI) {
				id
				excerpt
				title
				link
				dateGmt
				modifiedGmt
				content
				author {
					node {
						name
					}
				}
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
		}
	`;

	const data = await graphQLClient.request(query);
	if (!data.post) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			path,
			post: data.post,
			host: ctx.req.headers.host,
		},
	};
};

interface PostProps {
	post: any;
	host: string;
	path: string;
}

const Post: React.FC<PostProps> = (props) => {
	const { post, host, path } = props;

	// to remove tags from excerpt
	const removeTags = (str: string) => {
		if (str === null || str === '') return '';
		else str = str.toString();
		return str.replace(/(<([^>]+)>)/gi, '').replace(/\[[^\]]*\]/, '');
	};

	  return (
    <div>
      <Head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta charSet="utf-8" />
        <title>The Power of Chiropractic Care</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://www.terkini360.xyz/wp-content/uploads/2023/10/cc.jpg"
        />
        <meta
          property="og:image:url"
          content="https://www.terkini360.xyz/wp-content/uploads/2023/10/cc.jpg"
        />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="472" />
        <meta property="og:title" content="The Power of Chiropractic Care" />
        <meta
          property="og:url"
          content="https://www.terkini360.xyz/the-power-of-chiropractic-care"
        />
        <meta property="og:site_name" content="Terkini360 XYZ" />
        <meta
          property="og:description"
          content="Chiropractic care is a holistic approach to health that focuses on musculoskeletal well-being and the body's innate ability to heal itself. In this exploration of chiropractic care, we delve into its non-invasive techniques, the role of specialized healthcare professionals, and the profound benefits it offers."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://www.terkini360.xyz/the-power-of-chiropractic-care"
        />
        <link
          rel="modulepreload"
          as="script"
          crossorigin
          href="/_nuxt/entry.f44b8db3.js"
        />
        <link
          rel="modulepreload"
          as="script"
          crossorigin
          href="/_nuxt/_slug_.112574ba.js"
        />
        <link
          rel="prefetch"
          as="script"
          crossorigin
          href="/_nuxt/error-404.70c90608.js"
        />
        <link
          rel="prefetch"
          as="script"
          crossorigin
          href="/_nuxt/error-500.b0b78a3b.js"
        />
      </Head>
      <div>
        <h1>The Power of Chiropractic Care</h1>
        <img
          src="https://www.terkini360.xyz/wp-content/uploads/2023/10/cc.jpg"
          alt="Chiropractic Care"
        />
        <p>
          Chiropractic care is a holistic approach to health that focuses on
          musculoskeletal well-being and the body's innate ability to heal
          itself. In this exploration of chiropractic care, we delve into its
          non-invasive techniques, the role of specialized healthcare
          professionals, and the profound benefits it offers.
        </p>
      </div>
    </div>
  );
};

export default ChiropracticPage;
