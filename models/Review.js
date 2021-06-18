export default class {
  constructor({
    userId,
    bottleId,
    title = "",
    appearance = "",
    nose = "",
    palate = "",
    finish = "",
    conclusion = "",
    rating,
  }) {
    this.userId = userId;
    this.bottleId = bottleId;
    this.title = title;
    this.appearance = appearance;
    this.nose = nose;
    this.palate = palate;
    this.finish = finish;
    this.conclusion = conclusion;
    this.rating = rating;
  }
}
