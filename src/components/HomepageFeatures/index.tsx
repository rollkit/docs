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
    title: 'Deploy Easily',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
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
    title: 'Be Sovereign',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        RollKit enables developers to build rollups with sovereignty in mind.
        A sovereign rollup can fork just like an L1, giving its community a
        mechanism for social coordination.
      </>
    ),
  },
  {
    title: 'Scale Effortlessly',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Developers don’t need to sacrifice on security to achieve scale.
        RollKit enables developers to build blockchains using a data
        availability layer that scales with adoption while staying
        decentralized and secure.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
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
