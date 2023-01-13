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
    title: 'Easy to Deploy',
    Svg: require('@site/static/img/1F680.svg').default,
    description: (
      <>
        Developers can easily deploy a new blockchain without needing to
        bootstrap a secure and decentralized validator set. In addition,
        RollKit does not have the overhead associated with a heavy BFT
        consensus mechanism.
      </>
    ),
  },
  {
    title: 'Sovereign',
    Svg: require('@site/static/img/1f306.svg').default,
    description: (
      <>
        RollKit enables developers to build rollups with sovereignty in mind.
        A sovereign rollup can fork just like an L1, giving its community a
        mechanism for social coordination.
      </>
    ),
  },
  {
    title: 'Scalable',
    Svg: require('@site/static/img/1f4c8.svg').default,
    description: (
      <>
        Developers don’t need to sacrifice on security to achieve scale.
        RollKit enables developers to build blockchains using a data
        availability layer that scales with adoption while staying
        decentralized and secure.
      </>
    ),
  },
  {
    title: 'Secure',
    Svg: require('@site/static/img/1f512.svg').default,
    description: (
      <>
        RollKit offers a secure platform for developers to build and deploy
        decentralized applications, utilizing a modular data availability
        and consensus layer instead bootstrapping their own validator set.
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
