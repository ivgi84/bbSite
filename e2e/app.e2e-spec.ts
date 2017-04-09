import { BbsitePage } from './app.po';

describe('bbsite App', function() {
  let page: BbsitePage;

  beforeEach(() => {
    page = new BbsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
