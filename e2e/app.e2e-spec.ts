import {GateControlFrontendPage } from './app.po';

describe('gatecontrol-frontend App', () => {
  let page: GateControlFrontendPage;

  beforeEach(() => {
    page = new GateControlFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
