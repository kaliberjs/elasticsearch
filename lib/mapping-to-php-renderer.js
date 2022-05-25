"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mappingRenderer;

function mappingRenderer(template) {
  return "|<?php\n          |\n          |try {\n          |  return json_decode('".concat(JSON.stringify(template), "', true, 512, JSON_OBJECT_AS_ARRAY);\n          |} catch(\\Exception $e) {\n          |  return new \\WP_error('json decode error', $e->getMessage());\n          |}\n          |\n          |?>\n          |").split(/^[ \t]*\|/m).join('');
}
//# sourceMappingURL=mapping-to-php-renderer.js.map