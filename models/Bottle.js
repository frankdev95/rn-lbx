export default class Bottle {
  constructor(
    id,
    title,
    age,
    vintage,
    bottled,
    volume,
    ml,
    latestPrice,
    latestPriceData,
    cask,
    identifier,
    numBottles,
    brand,
    distillery,
    type,
    flavours,
    description,
    imgUrl,
    style,
    caskType,
    region
  ) {
    this.id = id;
    this.title = title;
    this.age = age;
    this.vintage = vintage;
    this.bottled = bottled;
    (this.volume = volume), (this.ml = ml);
    this.latestPrice = latestPrice;
    this.latestPriceData = latestPriceData;
    this.cask = cask;
    this.identifier = identifier;
    this.numBottles = numBottles;
    this.brand = brand;
    this.distillery = distillery;
    this.type = type;
    this.flavours = flavours;
    this.description = description;
    this.imgUrl = imgUrl;
    this.style = style;
    this.caskType = caskType;
    this.region = region;
    this.region = region;
  }
}
