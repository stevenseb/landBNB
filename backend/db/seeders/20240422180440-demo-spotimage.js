'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'SpotImages';
options.validate = true;

const demoSpotImages = [
    {
      "spotId": 1,
      "url": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=3574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "preview": true
    },
    {
      "spotId": 1,
      "url": "https://unsplash.com/photos/2d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 1,
      "url": "https://unsplash.com/photos/3d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 1,
      "url": "https://unsplash.com/photos/4d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Coastline_as_seen_from_Chimney_Rock%2C_Point_Reyes_National_Seashore.jpg/300px-Coastline_as_seen_from_Chimney_Rock%2C_Point_Reyes_National_Seashore.jpg",
      "preview": true
    },
    {
      "spotId": 2,
      "url": "https://unsplash.com/photos/6d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://unsplash.com/photos/7d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://unsplash.com/photos/8d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://network.land.com/wp-content/uploads/2017/02/listingPhotographyTips.jpg",
      "preview": true
    },
    {
      "spotId": 3,
      "url": "https://unsplash.com/photos/10d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://unsplash.com/photos/11d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://unsplash.com/photos/12d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://t3.ftcdn.net/jpg/05/56/88/18/360_F_556881864_T6KNWit9nKkRcgo7543KQQDJfIDvtocG.jpg",
      "preview": true
    },
    {
      "spotId": 4,
      "url": "https://unsplash.com/photos/14d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://unsplash.com/photos/15d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://unsplash.com/photos/16d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRirdvq2oBajcPS_1Y8185gLSgDBGiRZxo09g&s",
      "preview": true
    },
    {
      "spotId": 5,
      "url": "https://unsplash.com/photos/18d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://unsplash.com/photos/19d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://unsplash.com/photos/20d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://fitsmallbusiness.com/wp-content/uploads/2017/10/FeatureImage_buy-land.jpg",
      "preview": true
    },
    {
      "spotId": 6,
      "url": "https://unsplash.com/photos/22d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://unsplash.com/photos/23d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://unsplash.com/photos/24d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://facts.net/wp-content/uploads/2023/07/20-facts-about-land-1689716882.jpg",
      "preview": true
    },
    {
      "spotId": 7,
      "url": "https://unsplash.com/photos/26d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://unsplash.com/photos/27d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://unsplash.com/photos/28d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4wJH8U9tyUJRWy87mjc2uYOLjMXfY76nog&s",
      "preview": true
    },
    {
      "spotId": 8,
      "url": "https://unsplash.com/photos/30d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://unsplash.com/photos/31d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://unsplash.com/photos/32d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 9,
      "url": "https://www.oceanfront-camping.com/images/header-photos/20.jpg",
      "preview": true
    },
    {
      "spotId": 9,
      "url": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=3574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "preview": false
    },
    {
      "spotId": 9,
      "url": "https://cdn.landsearch.com/content/blog/_article/land-usage-definition.jpg?v=1653324730",
      "preview": false
    },
    {
      "spotId": 9,
      "url": "https://static.vecteezy.com/system/resources/previews/008/820/239/non_2x/landscape-green-rice-field-and-cassava-plantation-rice-farm-with-blue-sky-and-clouds-agriculture-land-plot-for-sale-farmland-rice-plantation-organic-rice-farm-carbon-credit-concept-rural-area-free-photo.jpg",
      "preview": false
    },
    {
      "spotId": 10,
      "url": "https://kirilovalaw.com/wp-content/uploads/2016/07/Agricultural-Land.jpg",
      "preview": true
    },
    {
      "spotId": 10,
      "url": "https://static.vecteezy.com/system/resources/previews/008/820/239/non_2x/landscape-green-rice-field-and-cassava-plantation-rice-farm-with-blue-sky-and-clouds-agriculture-land-plot-for-sale-farmland-rice-plantation-organic-rice-farm-carbon-credit-concept-rural-area-free-photo.jpg",
      "preview": false
    },
    {
      "spotId": 10,
      "url": "https://unsplash.com/photos/39d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 10,
      "url": "https://unsplash.com/photos/40d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 11,
      "url": "https://static.vecteezy.com/system/resources/previews/008/820/239/non_2x/landscape-green-rice-field-and-cassava-plantation-rice-farm-with-blue-sky-and-clouds-agriculture-land-plot-for-sale-farmland-rice-plantation-organic-rice-farm-carbon-credit-concept-rural-area-free-photo.jpg",
      "preview": true
    },
    {
      "spotId": 11,
      "url": "https://unsplash.com/photos/42d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 11,
      "url": "https://unsplash.com/photos/43d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 11,
      "url": "https://unsplash.com/photos/44d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 12,
      "url": "https://www.oceanfront-camping.com/images/header-photos/29.jpg",
      "preview": true
    },
    {
      "spotId": 12,
      "url": "https://unsplash.com/photos/46d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 12,
      "url": "https://unsplash.com/photos/47d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 12,
      "url": "https://cdn.landsearch.com/content/blog/_article/land-usage-definition.jpg?v=1653324730",
      "preview": false
    },
    {
      "spotId": 13,
      "url": "https://cdn.landsearch.com/content/blog/_article/land-usage-definition.jpg?v=1653324730",
      "preview": true
    },
    {
      "spotId": 13,
      "url": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=3574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "preview": false
    },
    {
      "spotId": 13,
      "url": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=3574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "preview": false
    },
    {
      "spotId": 13,
      "url": "https://unsplash.com/photos/52d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 14,
      "url": "https://cdn.landsearch.com/content/blog/_article/land-usage-definition.jpg?v=1653324730",
      "preview": true
    },
    {
      "spotId": 14,
      "url": "https://unsplash.com/photos/54d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 14,
      "url": "https://unsplash.com/photos/55d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 14,
      "url": "https://unsplash.com/photos/56d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 15,
      "url": "https://cdn.pixabay.com/photo/2022/03/21/02/08/land-7082135_640.jpg",
      "preview": true
    },
    {
      "spotId": 15,
      "url": "https://unsplash.com/photos/58d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 15,
      "url": "https://unsplash.com/photos/59d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 15,
      "url": "https://unsplash.com/photos/60d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 16,
      "url": "https://unsplash.com/photos/61d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 16,
      "url": "https://unsplash.com/photos/62d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 16,
      "url": "https://unsplash.com/photos/63d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 16,
      "url": "https://unsplash.com/photos/64d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 17,
      "url": "https://unsplash.com/photos/65d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 17,
      "url": "https://unsplash.com/photos/66d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 17,
      "url": "https://unsplash.com/photos/67d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 17,
      "url": "https://unsplash.com/photos/68d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 18,
      "url": "https://unsplash.com/photos/69d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 18,
      "url": "https://unsplash.com/photos/70d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 18,
      "url": "https://unsplash.com/photos/71d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 18,
      "url": "https://unsplash.com/photos/72d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 19,
      "url": "https://unsplash.com/photos/73d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 19,
      "url": "https://unsplash.com/photos/74d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 19,
      "url": "https://unsplash.com/photos/75d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 19,
      "url": "https://unsplash.com/photos/76d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 20,
      "url": "https://unsplash.com/photos/77d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 20,
      "url": "https://unsplash.com/photos/78d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 20,
      "url": "https://unsplash.com/photos/79d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 20,
      "url": "https://unsplash.com/photos/80d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 21,
      "url": "https://unsplash.com/photos/81d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 21,
      "url": "https://unsplash.com/photos/82d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 21,
      "url": "https://unsplash.com/photos/83d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 21,
      "url": "https://unsplash.com/photos/84d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 22,
      "url": "https://unsplash.com/photos/85d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 22,
      "url": "https://unsplash.com/photos/86d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 22,
      "url": "https://unsplash.com/photos/87d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 22,
      "url": "https://unsplash.com/photos/88d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 23,
      "url": "https://unsplash.com/photos/89d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 23,
      "url": "https://unsplash.com/photos/90d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 23,
      "url": "https://unsplash.com/photos/91d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 23,
      "url": "https://unsplash.com/photos/92d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 24,
      "url": "https://unsplash.com/photos/93d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 24,
      "url": "https://unsplash.com/photos/94d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 24,
      "url": "https://unsplash.com/photos/95d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 24,
      "url": "https://unsplash.com/photos/96d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 25,
      "url": "https://unsplash.com/photos/97d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 25,
      "url": "https://unsplash.com/photos/98d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 25,
      "url": "https://unsplash.com/photos/99d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 25,
      "url": "https://unsplash.com/photos/100d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 26,
      "url": "https://unsplash.com/photos/101d4lAQAlbDA",
      "preview": true
    },
    {
      "spotId": 26,
      "url": "https://unsplash.com/photos/102d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 26,
      "url": "https://unsplash.com/photos/103d4lAQAlbDA",
      "preview": false
    },
    {
      "spotId": 27,
      "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 27,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 28,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 29,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    
    {
      "spotId": 29,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
      "preview": true
    },
    {
      "spotId": 29,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 30,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 30,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 31,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 31,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 31,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 32,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 32,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 32,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 32,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 33,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },  
    {
      "spotId": 33,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
        "spotId": 33,
        "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 33,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 35,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 35,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      
      {
        "spotId": 35,
        "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
        "preview": true
      },
      {
        "spotId": 37,
        "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 36,
        "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 36,
        "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 36,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 37,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 37,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 37,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 38,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 38,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 39,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 39,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
    
      {
        "spotId": 39,
        "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 40,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 40,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 41,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
    
      {
        "spotId": 41,
        "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
        "preview": true
      },
      {
        "spotId": 42,
        "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 42,
        "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 43,
        "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
    
      {
        "spotId": 43,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 44,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 44,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 44,
        "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
    
      {
        "spotId": 44,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 45,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 45,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 46,
        "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 46,
        "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
      {
        "spotId": 47,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": false
      },
      {
        "spotId": 47,
        "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "preview": true
      },
    {
      "spotId": 48,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 49,
      "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 48,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 49,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 50,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    
    {
      "spotId": 50,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
      "preview": true
    },
    {
      "spotId": 50,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 51,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 52,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 51,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 52,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 53,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 53,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 54,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 54,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 55,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 55,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 56,
      "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 56,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 57,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 57,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    
    {
      "spotId": 58,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
      "preview": true
    },
    {
      "spotId": 58,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 59,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 59,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 60,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 60,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 61,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 61,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 62,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 62,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 63,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 63,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 64,
      "url": "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "preview": true
    },
    {
      "spotId": 64,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 65,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 65,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 66,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 66,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 67,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 67,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 68,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 68,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 69,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 69,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 69,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 69,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 70,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 70,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 70,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 70,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 71,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 71,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 71,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 71,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 72,
      "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 72,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 72,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 72,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 73,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
      "preview": true
    },
    {
      "spotId": 73,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 73,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 73,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 74,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 74,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 74,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 75,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 75,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 75,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 76,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 76,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 77,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 77,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 77,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 78,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 78,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 78,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 79,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
  
    {
      "spotId": 80,
      "url": "https://images.unsplash.com/photo-1533328624755-6e81fd927bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 79,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 79,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 80,
      "url": "https://images.unsplash.com/photo-1601053539591-da7b9c54d2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 80,
      "url": "https://images.unsplash.com/photo-1504280690773-38650740aaa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
      "preview": false
    },
    {
      "spotId": 68,
      "url": "https://images.unsplash.com/photo-1571004343638-82ceb27dbde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 69,
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 70,
      "url": "https://images.unsplash.com/photo-1512856822635-e6e19a987417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
  
    {
      "spotId": 74,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 78,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 76,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 81,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 81,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 81,
      "url": "https://images.unsplash.com/photo-1600857262923-7b6c9d4c0350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 82,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": true
    },
    {
      "spotId": 82,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 82,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    },
    {
      "spotId": 82,
      "url": "https://images.unsplash.com/photo-1542601675-c9d78d9b5a32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "preview": false
    }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate(demoSpotImages, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
