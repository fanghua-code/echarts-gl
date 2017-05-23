module.exports = "@export ecgl.labels3D.vertex\n\nattribute vec3 position: POSITION;\nattribute vec2 texcoord: TEXCOORD_0;\nattribute vec2 offset;\n#ifdef VERTEX_COLOR\nattribute vec4 a_Color : COLOR;\nvarying vec4 v_Color;\n#endif\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform vec4 viewport : VIEWPORT;\n\nvarying vec2 v_Texcoord;\n\nvoid main()\n{\n vec4 proj = worldViewProjection * vec4(position, 1.0);\n\n vec2 screen = (proj.xy / abs(proj.w) + 1.0) * 0.5 * viewport.zw;\n\n screen += offset;\n\n proj.xy = (screen / viewport.zw - 0.5) * 2.0 * abs(proj.w);\n gl_Position = proj;\n#ifdef VERTEX_COLOR\n v_Color = a_Color;\n#endif\n v_Texcoord = texcoord;\n\n gl_PointSize = 10.0;\n}\n@end\n\n\n@export ecgl.labels3D.fragment\n\nuniform vec3 color : [1.0, 1.0, 1.0];\nuniform float alpha : 1.0;\nuniform sampler2D textureAtlas;\nuniform vec2 uvScale: [1.0, 1.0];\n\n#ifdef VERTEX_COLOR\nvarying vec4 v_Color;\n#endif\nvarying float v_Miter;\n\nvarying vec2 v_Texcoord;\n\nvoid main()\n{\n gl_FragColor = vec4(color, alpha) * texture2D(textureAtlas, v_Texcoord * uvScale);\n#ifdef VERTEX_COLOR\n gl_FragColor *= v_Color;\n#endif\n}\n\n@end";
