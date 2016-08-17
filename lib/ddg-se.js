/*
 * Copyright (C) 2016 DuckDuckGo, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var { Services }  = require("resource://gre/modules/Services.jsm");
var name, t_param;

exports.init = function (n, t) {
  name = n;
  t_param = t;
}

exports.install = function() {
  Services.search.addEngineWithDetails(
    name,
    iconURI,
    name,
    name,
    'GET',
    'https://duckduckgo.com/?q={searchTerms}&t=' + t_param
  );
}

exports.makeDefault = function() {
  var se = Services.search.getEngineByName(name);
  if (se !== null) {
    Services.search.currentEngine = se;
  }
}

exports.uninstall = function() {
    var se = Services.search.getEngineByName(name);
    if (se !== null)
      Services.search.removeEngine(se);
}

var iconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB8lBMVEUAAADkRQzjPwPjQQXkRQ3iPwTiQQXgPQPeQgrcOwPVNgDVNQDWOgbTMwDRMgDQMwDSMwDRNwTQLgDRJgDSJwDSLgDSNwTjOgDiOADjOQDkPADhQAXzs5v+/fv////0vKbiRQvgPQHpdUr85NzuknPdKgDcIwDnZzj2w7HqeU/gPQLsimb/+PftjWn97Obpb0LdJQDeLQDtjmvsi2jgSBDnbULgOQD/39HgLQDeMgDpeFLgSBH0v670uqbaJQD2qImWvP/G1Ob5+/3u//+fvvXyp47dMwDaLwD0u6v0v6/aNQDiXi/aKQD3qozU7/8gSY2vvtg0ZK/OqLDaKQHYKgLgWTfaNADZMgDZMADZLADzqpD7//+xwdz//9H/5Bn/7Bn//ADofADYMADYMQDZOgPXLgDiZDj//97/0AD3tQDvlgHZOgbXLATXMADWMgDfXjLVLQD///z+0AD/3Rn/yRnwnQDcVjbVMQDyv67wuKTSJwDRHQD+8O/tg3/iQQDwhAHnawHWMADvtKfyva7XQxHga0bQGQD2vbH/u8LXIQCmPQzja07XQxLliGn99fPkcVHvhnGZ5VguvUU5wktBwCcAgxzydVv/8/XmiGngdlL+ysi3+I8LtCE80V6P3YmX4sDleljSNQLzr6D7sKPXNQTSIwAEAbMrAAAAF3RSTlMARqSkRvPz80PTpKRG3fPe3hio9/eoGP50jNsAAAABYktHRB5yCiArAAAAyElEQVQYGQXBvUqCYRiA4fu2V9Tn+UQddI3aCpxaOoU6iU4gcqqpoYbALXBuCuoYmttamqJDiEoh4YP+MOi6BNCh+uYKEGiOVNCXXxA2XDVV/UyfKbRCXTLQWAxbP2vt8Ue/uYDvfim91615sb2um6rqtrr/NFb1cUf1Ybd06areU6lSlYpK79jzK1SyJOkfhOl8JGEcqV5zoKrTRqO6yUzIzNu46ijdM1VV9bhuUJ/nZURExLRzUiPQm3kKXHi4BAEGOmOi78A/L1QoU/VHoTsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDEtMTlUMjA6MDE6MTEtMDU6MDAuET6cAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAxLTE5VDIwOjAxOjExLTA1OjAwX0yGIAAAAABJRU5ErkJggg==";
