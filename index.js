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

var self = require("sdk/self"),
    panels = require("sdk/panel"),
    DDGSearchEngine = require('./lib/ddg-se.js');

var { ToggleButton } = require('sdk/ui/button/toggle');

exports.main = function(options) {
  DDGSearchEngine.init('DuckDuckGo for Sample Extension', 'se');


  var panel = panels.Panel({
    contentURL: self.data.url("html/panel.html")
  });

  panel.port.on('install', function(){
    DDGSearchEngine.install();
    DDGSearchEngine.makeDefault();
  });

  var button = ToggleButton({
    id: "my-button",
    label: "my button",
    icon: {
      "16": self.data.url("img/icon_16.png"),
      "32": self.data.url("img/icon_32.png"),
      "64": self.data.url("img/icon_64.png")
    },
    onChange: function (state) {
      if (state.checked) {
        panel.show({
          position: button
        });
      }
    }
  });
}

exports.onUnload = function(options) {
  if (options.reason == 'uninstall') {
    DDGSearchEngine.uninstall();
  }
}
