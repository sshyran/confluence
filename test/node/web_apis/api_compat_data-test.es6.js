// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

describe('CompatClassGenerator', () => {
  let Release;
  let generator;
  beforeEach(() => {
    Release = org.chromium.apis.web.Release;
    generator = org.chromium.apis.web.CompatClassGenerator.create();
  });

  function generateClass(dupe) {
    return generator.generateClass(
        generator.generateSpec('org.chromium.apis.web', 'CompatClass', [
          Release.create({
            browserName: 'Alpha',
            browserVersion: '1.2.3',
            osName: 'Zulu',
            osVersion: '9.8.7',
          }),
          Release.create({
            browserName: dupe ? 'Alpha' : 'Beta',
            browserVersion: '1.2.3',
            osName: 'Zulu',
            osVersion: '9.8.7',
          }),
        ]));
  }

  it('should handle multiple relases', () => {
    const CompatData = generateClass(false);
    const axioms = CompatData.getAxiomsByClass(org.chromium.apis.web.CompatProperty);
    expect(axioms.length).toBe(2);
  });

  it('should ignore duplicate relases', () => {
    const CompatData = generateClass(true);
    const axioms = CompatData.getAxiomsByClass(org.chromium.apis.web.CompatProperty);
    expect(axioms.length).toBe(1);
  });
});
