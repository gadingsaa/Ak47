import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const endpoint = "http://www.terkini360.xyz/graphql"
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
					`http://www.terkini360.xyz/` + encodeURI(path as string)
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
		<>
			<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:image" content="https://www.terkini360.xyz/wp-content/uploads/2023/09/jpg_20230919_233444_0000.jpg">
<meta property="og:image:url" content="https://www.terkini360.xyz/wp-content/uploads/2023/09/jpg_20230919_233444_0000.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:title" content="Hannah Palmmer">
<meta property="og:url" content="https://www.terkini360.xyz/hannah-palmer/">
<meta property="og:site_name" content="https://www.terkini360.xyz/">
<meta property="og:type" content="website">
			<div className="post-container">
				
				<img
					src={post.featuredImage.node.sourceUrl}
					alt={post.featuredImage.node.altText || post.title}
				/>
				
			</div>
		</>
	);
};

export default Post;
