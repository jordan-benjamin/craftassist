/**
 *
 * @license
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/**
 * @fileoverview This file contains the definition and code generator for the custom block used by the template generator.
 */

import * as Blockly from "blockly/core";
import "blockly/javascript";
import saveBlockCallback from "./rightClickCallbacks/saveBlockCallback";
import tagBlockCallback from "./rightClickCallbacks/tagBlockCallback";

/**
 *
 * A custom block has a next connection, and a name field.
 * The name field is the name of the Template object that the block
 * represents.
 */

Blockly.Blocks["customBlock"] = {
  init: function () {
    this.appendValueInput("next")
      .setCheck(null)
      .appendField(new Blockly.FieldTextInput("Custom block"), "name");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(270);
    this.setTooltip("");
    this.setHelpUrl("");
    customInit(this);
  },
};

// The code generated by a custom block is a function of its name.

Blockly.JavaScript["customBlock"] = function (block) {
  var valueName = block.getFieldValue("name");

  // Information about template/template objects
  var templatesString = localStorage.getItem("templates");

  var code;
  if (templatesString) {
    // If information about the template/template object exists, we use it
    var templates = JSON.parse(templatesString);
    code = templates[valueName]["code"];
  }
  return [JSON.stringify(code), Blockly.JavaScript.ORDER_ATOMIC];
};

// Custom right click menu for the block. We add a saveBlock and tagBlock option.

const customInit = (block) => {
  const menuCustomizer = (menu) => {
    const saveOption = {
      text: "Save by name",
      enabled: true,
      callback: () => saveBlockCallback(block),
    };
    menu.push(saveOption);

    const tagOption = {
      text: "Save by tag",
      enabled: true,
      callback: () => tagBlockCallback(block),
    };
    menu.push(tagOption);

    return menu;
  };
  block.customContextMenu = menuCustomizer;
};
