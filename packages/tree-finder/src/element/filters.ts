/*
 * Copyright (c) 2020, Max Klein
 *
 * This file is part of the tree-finder library, distributed under the terms of
 * the BSD 3 Clause license. The full license can be found in the LICENSE file.
 */
import { ContentsModel } from "../model";
import { Tag } from "../util";

import { TreeFinderFilterElement } from "./filter";

TreeFinderFilterElement.get();

export class TreeFinderFiltersElement extends HTMLElement {
  clear() {
    this.innerHTML = `<tree-finder-filter"></tree-finder-filter>`.repeat(this.model.columns.length);

    this.filters = this.children as any as [TreeFinderFilterElement];
  }

  connectedCallback() {
    if (!this._initialized) {
      this.create_shadow_dom();

      this._initialized = true;
    }

    // if (!this._initializedListeners) {
    //   this.addEventListener("mouseup", event => this.onClick(event));

    //   this._initializedListeners = true;
    // }
  }

  init(model: ContentsModel<any>) {
    this.model = model;

    this.clear();

    for (const filter of this.filters) {
      filter.init(model);
    }
  }

  create_shadow_dom() {
    this.attachShadow({mode: "open"});

    const filterSlot = `<slot></slot>`;

    this.shadowRoot!.innerHTML = Tag.html`
      <style>
      </style>
      <div class="tf-filters-top">
        ${filterSlot}
      </div>
    `;

    [this.shadowSheet, this.top] = this.shadowRoot!.children as any as [StyleSheet, HTMLElement];
  }


  protected filters: TreeFinderFilterElement[];
  protected model: ContentsModel<any>;
  protected shadowSheet: StyleSheet;
  protected top: HTMLElement;

  private _initialized: boolean = false;
  // private _initializedListeners: boolean = false;
}

export namespace TreeFinderFiltersElement {
  export function get() {
    if (document.createElement("tree-finder-filters").constructor === HTMLElement) {
      customElements.define("tree-finder-filters", TreeFinderFiltersElement);
    }

    return customElements.get('tree-finder-filters');
  }
}

TreeFinderFiltersElement.get();
