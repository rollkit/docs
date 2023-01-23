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
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
           <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Build Modular
          </Link>
          {/* <Link
            className="front-page-link"
            to="/docs/intro/">
              <p className="button-heading">Intro</p>
              Learn How Rollkit Works
          </Link>
          <Link
            className="front-page-link"
            to="/docs/core-concepts/">
              <p className="button-heading">Concepts</p>
              Learn About Modular Rollups 
          </Link>
          <Link
            className="front-page-link"
            to="/docs/tutorials/gm-world/">
               <p className="button-heading">Sovereign Chain</p>
              Deploy a Rollup with Rollkit
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
      description="The first modular development kit for building sovereign rollups">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
