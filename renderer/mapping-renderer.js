export default function mappingRenderer(template) {
  return `|<?php

          |return function () {
          | try {
          |   return json_decode('${JSON.stringify(template)}', true, 512, JSON_OBJECT_AS_ARRAY);
          | } catch(\\Exception $e) {
          |   return new \\WP_error('json decode error', $e->getMessage());
          | }
          |};

          |?>
  `.split(/^[ \t]*\|/m).join('')
}
