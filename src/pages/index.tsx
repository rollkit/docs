import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.tagline}</h1>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div className={styles.buttons}>
           <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Learn more
          </Link>
          {/* <Link
            className="front-page-link"
            to="/docs/intro/">
              <p className="button-heading">Intro</p>
              Learn how Rollkit works
          </Link>
          <Link
            className="front-page-link"
            to="/docs/rollkit-stack/">
              <p className="button-heading">Concepts</p>
              Learn about modular rollups 
          </Link>
          <Link
            className="front-page-link"
            to="/docs/tutorials/hello-world/">
               <p className="button-heading">Build a rollup</p>
              Deploy a rollup with Rollkit
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Build modular with ${siteConfig.title}`}
      description="A modular framework for rollups.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
