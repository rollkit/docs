import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secure',
    Svg: require('@site/static/img/1f512.svg').default,
    description: (
      <>
        Rollups inherit security from the consensus and data availability layer
      </>
    ),
  },
  {
    title: 'Scalable',
    Svg: require('@site/static/img/1f4c8.svg').default,
    description: (
      <>
        Rollups post their blocks on a modular consensus layer
      </>
    ),
  },
  {
    title: 'Sovereign',
    Svg: require('@site/static/img/1f306.svg').default,
    description: (
      <>
        Freedom to fork
      </>
    ),
  },
  {
    title: 'Easy to Deploy',
    Svg: require('@site/static/img/1f680.svg').default,
    description: (
      <>
        Rollups deployed with a few lines of code
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
