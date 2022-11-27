<h2>A Kafka</a> provider for <a href="https://adonisjs.com/">AdonisJS</a>

</br>

<h2>
Adonis Kafka provides an easy way to start using Kafka.
</h2>

<div>

[![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url] [![synk-image]][synk-url]

</div>

</br>

> API is based on https://github.com/Frubana/adonis-kafka and depends on [kafkajs](https://kafka.js.org/)

</br>

## Getting Started

Let's start by installing the package in our project.

**Yarn**:

```sh
yarn add @djpfs/adonis-kafka
```

**NPM**:

```sh
npm install @djpfs/adonis-kafka
```

## Setup

You can configure the project by running the following command:

```sh
node ace invoke @djpfs/adonis-kafka
```

### Adding Topics

```sh
node ace make:prldfile kafka
```

```ts
// start/kafka.ts
import Kafka from '@ioc:Kafka'

// Callback function
Kafka.on('topic_name', async (data, commit) => {
  commit() // For successful transaction
  commit(false) // For failed transaction
})

// Multiple topics
Kafka.on('topic_name_1,topic_name_2,topic_name_3', async (data, commit) => {
  commit() // For successful transaction
  commit(false) // For failed transaction
})
```

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@djpfs/adonis-kafka.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@djpfs/adonis-kafka 'npm'
[license-image]: https://img.shields.io/npm/l/@djpfs/adonis-kafka?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/djpfs/adonis-kafka?label=Synk%20Vulnerabilities&style=for-the-badge
[synk-url]: https://snyk.io/test/github/djpfs/adonis-kafka?targetFile=package.json 'synk'
