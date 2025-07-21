---
aside: false
outline: false
title: vitepress-openapi
---

<script setup lang="ts">
import { useRoute } from 'vitepress'
import spec from '../../src/openapi-rpc.json'

const route = useRoute()

const operationId = route.data.params.operationId
</script>

<OAOperation :spec="spec" :operationId="operationId" />