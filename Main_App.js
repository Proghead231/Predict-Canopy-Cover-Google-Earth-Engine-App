//Panels
var leftpanel = ui.Panel({style:{width:'480px'}});
var rightpanel = ui.Panel();
var split = ui.SplitPanel({
  firstPanel: leftpanel, 
  secondPanel: rightpanel, 
  orientation: "horizontal",
  style: {width: '850px'}
});
ui.root.insert(0, split);


//Panel Labels
var leftTitle = ui.Label({
  value: 'Results and Hints', 
  style: {
    width: '100%',
    fontSize: '25px',
    backgroundColor: 'grey',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0px'
  }, 
});
leftpanel.add(leftTitle);
 
var rightTitle = ui.Label({
  value: 'Controls', 
  style: {
    width: '100%',
    fontSize: '25px',
    backgroundColor: 'grey',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0px'
  }, 
});
rightpanel.add(rightTitle);

//Important note to the users
var note1 = ui.Label({
  value: 'Note: Do not use space when entering band names and land cover codes ' +  
          '(Correct way: B1,B2,B3) ' + 'Your classified image needs ' + 
          'to have one class for forest/tree cover, one class for other ' + 
          'vegetation i.e., vegetation except forest, and one class for ' + 
          'bareland and other impervious surface. Example: 1-Forest, ' + 
          '2-Other Vegetation, 3-Bareland and Builtup. ' + 
          'You may need to reclassify it before using if you have different classes ',
  style: {
  width: '100%',
  fontSize: '16px',
  backgroundColor: 'F9D5CD',
  textAlign: 'left',
  //fontWeight: 'bold',
  margin: '0px'
  }, 
});
leftpanel.add(note1);

var note2 = ui.Label({
  value:  'Use the following Demo datasets to try the app. Note that the datasets are from 2003 and the validation samples are just random number (not real canopy cover data). ',
  style: {
  width: '100%',
  fontSize: '16px',
  backgroundColor: 'FFAE9C',
  textAlign: 'left',
  border: '1px solid black',
  margin: '0px'
  }, 
});
leftpanel.add(note2);


var note6 = ui.Label({
  value: '<<Validation Samples>>users/joshisur231/FCC_App/FCC_Validation_Samples<<Validation Samples>>',
  style: {
  width: '100%',
  fontSize: '16px',
  //backgroundColor: 'red',
  textAlign: 'left',
  //fontWeight: 'bold',
  margin: '0px'
  }, 
});
leftpanel.add(note6);

//Show and Hide Panel
var showHidePanel = ui.Checkbox({
  label: "Show/Hide Panel",
  style:{position: 'bottom-right'},
  value: 1,
  onChange: function(value){
    split.style().set('shown', value);  
  }
});
Map.add(showHidePanel);

//Input Paths///
var goRoi = ui.Button({
  label: 'Zoom to study area',
  style:{position: 'bottom-left'},
  onClick: function(){
    Map.centerObject(ee.FeatureCollection(roiPath.getValue()), 9);
  }
});

var demo = ui.Button({
  label: 'Use Demo Datasets',
  style: {width: '463px'},
  onClick: function(){
    roiPath.setValue('users/joshisur231/PNP');
    imagePath.setValue('users/joshisur231/TopoCo2003_New');
    selectBands.setValue('B1,B2,B3,B4,B5');
    classifiedPath.setValue('users/joshisur231/UnigisThesis/Results2003/Classified2003');
    selectLc.setValue('0,1,2');
  }
});
leftpanel.add(demo);

var roiPath = ui.Textbox({
  placeholder: 'Input ROI path',
  style: {width: '100%', margin: '0px'},
  onChange: function(value){
    Map.add(goRoi);
    return roiPath.setValue(value);
  }
});
rightpanel.add(roiPath);

var imagePath = ui.Textbox({
  placeholder: 'Input image path',
  style: {width: '100%', margin: '0px'},
  onChange: function(value){
    return imagePath.setValue(value);
  }
});
rightpanel.add(imagePath);

var selectBands = ui.Textbox({
  placeholder: "Enter bands names for blue, green, red, nir and swir1 seperated by comma",
  style: {width: '100%', margin: '0px'},
  onChange: function(value){
    //var valueStr = ee.String(value);
    return selectBands.setValue(value);
  }
});
rightpanel.add(selectBands);

var classifiedPath = ui.Textbox({
  placeholder: "Enter path for land cover",
  style: {width: '100%', margin: '0px'},
  onChange: function(value){
    return classifiedPath.setValue(value);
  }
});
rightpanel.add(classifiedPath);

var selectLc = ui.Textbox({
  placeholder: 'Enter Land Cover Class Codes for Forest, Other Vegetation and Bare separated by comma',
  style: {width: '100%', margin: '0px'},
  onChange: function(value){
    //var valueStr = ee.String(value);
    return selectLc.setValue(value);
  }
});
rightpanel.add(selectLc);

var rescaleBandsComputeIndicesButton = ui.Button({
  label: 'Normalize Bands and Compute Indices'
});

var pcButton = ui.Button({
  label: 'Run PCA'
});

var vdButton = ui.Button({
  label: 'Compute VD'
});

var ssiButton = ui.Button({
  label: 'Compute SSI and Canopy Cover'
});

var askAccuracyAssess = ui.Button({
  label: 'Accuracy Assessment'
});

var runAccuracyAssess = ui.Button({
  label: 'Run Accuracy Assessment'
});

var selectVI = ui.Select({
  items: ['NDVI', 'AVI'],
});
selectVI.onChange(function(value){
  return selectVI.setValue(value);
});

var vdMin = ui.Textbox({
  placeholder: 'Input Min for VD Computation',
  style: {width: '230px'},
});
vdMin.onChange(function(value){
    return vdMin.setValue(value);
});

var vdMax = ui.Textbox({
placeholder: 'Input Max for VD Computation',
style: {width: '230px'},

});
vdMax.onChange(function(value){
  return vdMax.setValue(value);
});

var siMin = ui.Textbox({
  placeholder: 'Input Min for SSI Computation',
  style: {width: '230px'},
});
siMin.onChange(function(value){
  return siMin.setValue(value);
});

var siMax = ui.Textbox({
  placeholder: 'Input Max for SSI Computation',
  style: {width: '230px'},
});
siMax.onChange(function(value){
  return siMax.setValue(value);
});

var validPath = ui.Textbox({
  placeholder: 'Path of Validation Samples',
  style: {width: '100%'},
});
validPath.onChange(function(value){
    ee.FeatureCollection(value).first().propertyNames().evaluate(function(names){
      selectValCol.items().reset(names);
    });
    return validPath.setValue(value);
});

var selectValCol = ui.Select({
  placeholder: 'Select Validation Samples Column',
});
selectValCol.onChange(function(value){
    return selectValCol.setValue(value);
});



//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 1 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 1: Remove Water Bodies from Image///////////////////////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 1 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var waterMask = function(){
  //creating Image from user inputs and renaming bands for standardization
  var str = ee.String(selectBands.getValue());
  var bandList = str.split(',');
  var userimage = ee.Image(imagePath.getValue())
                           .select(bandList)
                           .rename(['blue', 'green', 'red', 'nir', 'swir1']);
                           
  //Water Masking using NDVI 
  var ndvi = userimage.normalizedDifference(['nir', 'red']).rename('ndvi');
  var water = ndvi.lt(0);
  var waterMask = water.eq(0);
  var waterMaskedImage = userimage.updateMask(waterMask);
  Map.addLayer(ee.FeatureCollection(roiPath.getValue()), {}, 'ROI', false);
  //Map.addLayer(waterMaskedImage, {min: 0, max: 3000, bands: ['red', 'green', 'blue'], gamma: 1.5}, 'Water Masked Image: True Color', false);
  
  return waterMaskedImage;
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 1 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 1: Remove Water Bodies from Image///////////////////////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 1 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑










//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 2 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 2: Rescaling the band and Computing Required Indices/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 2 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Function to rescale each band in the image from 0 to 255
var rescale = function(image, minMaxOfImage) {
  var rescaled = ee.ImageCollection.fromImages(
    image.bandNames().map(function(name){
      name = ee.String(name);
      var band = image.select(name);
      return band.unitScale(ee.Number(minMaxOfImage.get(name.cat('_min'))), ee.Number(minMaxOfImage.get(name.cat('_max'))))
                 .multiply(255);}))
                 .toBands()
                 .rename(image.bandNames());
    
    return rescaled;
};





//Function to get min-max  
  var getMinMax = function(image){
    var minMax = image.reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: ee.FeatureCollection(roiPath.getValue()),
      scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
      maxPixels: 10e9,
    });   
  return minMax;
  };
  
  
  
  
  
//Function to derive required indices after rescaling
var rescaleImageAddIndices = function(waterMaskedImage){
  //Rescaling all bands 0-255
  var resacledWaterMaskedImage = rescale(waterMaskedImage, getMinMax(waterMaskedImage));
  
  //Deriving Indices  
  //NDVI
  var ndviImage = resacledWaterMaskedImage.normalizedDifference(['nir', 'red']).rename('ndvi');
  
  //AVI
  var aviFormulaPart1 = '((nir + 1) * (256 - red) * (nir - red))';
  var aviImage1 = ee.Image().expression({
    expression: aviFormulaPart1,
    map: {
      nir: resacledWaterMaskedImage.select('nir'),
      red: resacledWaterMaskedImage.select('red')
    }
  });
  var testNirSubRed = resacledWaterMaskedImage.select('nir')
                      .subtract(resacledWaterMaskedImage.select('red'));
  var aviImageFinal = aviImage1.cbrt().where(testNirSubRed.lt(0), 0).rename('avi');
  
  //BI
  var biFormula = '(((swir1 + red) - (nir + blue)) / ((swir1 + red) + (nir + blue))) * 100 + 100';
  var biImage = ee.Image().expression({
    expression: biFormula,
    map: {
      swir1: resacledWaterMaskedImage.select('swir1'),
      red: resacledWaterMaskedImage.select('red'),
      nir: resacledWaterMaskedImage.select('nir'),
      blue: resacledWaterMaskedImage.select('blue')
    }
  }).rename('bi');
  
  //SI
  var siFormulaPart1 = '(256 - blue) * (256 - green) * (256 - red)';
  var siImage1 = ee.Image().expression({
    expression: siFormulaPart1,
    map: {
      blue: resacledWaterMaskedImage.select('blue'),
      green: resacledWaterMaskedImage.select('green'),
      red: resacledWaterMaskedImage.select('red')
    }
  });
  var siImageFinal = siImage1.cbrt().rename('si');
  
  //Creating Final Composite with Rescaled Bands and Indices
  var bandsWithIndices = waterMaskedImage.select(['blue', 'green', 'red'])
                                  .addBands(ndviImage)
                                  .addBands(aviImageFinal)
                                  .addBands(biImage)
                                  .addBands(siImageFinal);
  var rescaledBandsWithIndices = rescale(bandsWithIndices, getMinMax(bandsWithIndices));
  
  //print('Rescaled Image with Indices', rescaledBandsWithIndices);
  Map.addLayer(rescaledBandsWithIndices, {min: 5, max: 250, gamma: 1.5, bands:['red', 'blue', 'green']}, 'True Color', false);
  Map.addLayer(rescaledBandsWithIndices.select('ndvi'), {min: 0, max: 255}, 'NDVI', false);
  Map.addLayer(rescaledBandsWithIndices.select('avi'), {min: 0, max: 255}, 'AVI', false);
  Map.addLayer(rescaledBandsWithIndices.select('bi'), {min: 0, max: 255}, 'BI', false);
  Map.addLayer(rescaledBandsWithIndices.select('si'), {min: 0, max: 255}, 'SI', false);

return rescaledBandsWithIndices;
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 2 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 2: Rescaling the band and Computing Required Indices/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 2 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑









//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 3 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 3: Corelation Between NDVI/AVI and BI/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 3 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var corelation = function(rescaledBandsWithIndices){
  var corelationNote = ui.Label({
  value: 'Use the information below to select the appropriate vegetation index. ' + 
         'Usually the one that is more correlated to the BI. ' + 
         'Note NDVI saturates at higher vegetation density levels. ' + 
         'While AVI is better at representing vegetation density, make sure the coorrelation is strong',
  style: {
    width: '100%',
    fontSize: '16px',
    border: '1px solid black',
    textAlign: 'left',
    //fontWeight: 'bold',
    margin: '6px 0px 0px 0px'
    }, 
  });
  leftpanel.add(corelationNote);
  
  var corelationBIvsNDVI = rescaledBandsWithIndices.select(['bi', 'ndvi'])
                           .reduceRegion({
                             reducer: ee.Reducer.pearsonsCorrelation(),
                             geometry: ee.FeatureCollection(roiPath.getValue()),
                             scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
                             maxPixels: 1e9
                           });

  var corelationBIvsAVI = rescaledBandsWithIndices.select(['bi', 'avi'])
                           .reduceRegion({
                             reducer: ee.Reducer.pearsonsCorrelation(),
                             geometry: ee.FeatureCollection(roiPath.getValue()),
                             scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
                             maxPixels: 1e9
                           });

  var pearCofBiVsNdvi = ui.Label({
    value: corelationBIvsNDVI.get('correlation')
      .evaluate(function(coorelation){
        pearCofBiVsNdvi.setValue('Pearson`s Corelation Coefficient for BI and NDVI: ' + coorelation.toFixed(4));
    }),
    style: {width: '400px', height: '40px', fontSize: '14px', fontWeight: 'bold', color: '484848'}
  });
  leftpanel.add(pearCofBiVsNdvi);
  
  //Scatterplot for BI and NDVI
  var ndviBiSamples = rescaledBandsWithIndices.select(['bi', 'ndvi']).sample({
    region: ee.FeatureCollection(roiPath.getValue()),
    scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
    numPixels: 1000,
    //geometries: true
  });

  var biVsNdviChart = ui.Chart.feature.byFeature(ndviBiSamples, 'bi', 'ndvi')
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Relationship between BI and NDVI',
      pointSize: 3,
      hAxis: {title: 'BI'},
      vAxis: {title: 'NDVI'},
      trendlines:{
        0: {
          type: 'linear',
          color: 'red',
          visibleInLegend: true,
          lineWidth: 30,
          opacity: 0.2,
          showR2: true
          }
      }
    });
  leftpanel.add(biVsNdviChart);  
  
  var pearCofBiVsAvi = ui.Label({
    value: corelationBIvsAVI.get('correlation')
      .evaluate(function(coorelation){
      pearCofBiVsAvi.setValue('Pearson`s Corelation Coefficient for BI and AVI: ' + coorelation.toFixed(4));
    }),
    style: {width: '400px', height: '40px', fontSize: '14px', fontWeight: 'bold', color: 'black'}
  });
  leftpanel.add(pearCofBiVsAvi);
  
  //Scatterplot for BI and AVI
  var aviBiSamples = rescaledBandsWithIndices.select(['bi', 'avi']).sample({
    region: ee.FeatureCollection(roiPath.getValue()),
    scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
    numPixels: 1000,
  });

  var biVsAviChart = ui.Chart.feature.byFeature(aviBiSamples, 'bi', 'avi')
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Relationship between BI and AVI',
      pointSize: 3,
      hAxis: {title: 'BI'},
      vAxis: {title: 'AVI'},
      trendlines:{
        0: {
          type: 'linear',
          color: 'red',
          visibleInLegend: true,
          lineWidth: 20,
          opacity: 0.2,
          showR2: true
          }
      }
    });
  leftpanel.add(biVsAviChart);  
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 3 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 3: Corelation Between NDVI/AVI and BI/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 3 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑












//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 4 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 4: Principal Component Analysis to Compute VD/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 4 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var pca = function(rescaledBandsWithIndices){  
  var selectedVI = ee.String(selectVI.getValue()).toLowerCase();
  
  var viBiArray = rescaledBandsWithIndices
                  .select([selectedVI, 'bi'])
                  .toArray();
      
  var covar = viBiArray.reduceRegion({
    reducer: ee.Reducer.covariance(),
    geometry: ee.FeatureCollection(roiPath.getValue()),
    scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
    maxPixels: 1e9
  });
  
  var covarArray = ee.Array(covar.get('array'));
  var eigens = covarArray.eigen();
  var eigenVectors = eigens.slice(1, 1);
  
  var pcTransform = ee.Image(eigenVectors)
                  .matrixMultiply(viBiArray.toArray(1));
                  
  var pc = pcTransform.arrayProject([0]).arrayFlatten([['pc1', 'pc2']]).select('pc1');
  
  var rgbPcIndices = rescaledBandsWithIndices
                     .select(['blue', 'green', 'red', 'ndvi', 'avi', 'si', 'bi'])
                     .addBands(pc);
                     
return rgbPcIndices;
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 4 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 4: Principal Component Analysis to Compute VD/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 4 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑










//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 5 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 5: Compute VD/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 5 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Stats to help users in determining min and max for VD
var vdStats = function(rgbPcIndices, classifiedImage){
  var vdNote = ui.Label({
    value: 'Use the information below to select the appropriate minimum and maximum values for Vegetation Density. ' + 
         'Usually the point where bareland and vegetation intersect is best for minimum. ' + 
         'For maximum value it is better to consider the tail values as outliers. ' + 
         'Identify outliers, if there are any or use the maximum of the first PC',
    style: {
    width: '100%',
    fontSize: '16px',
    border: '1px solid black',
    textAlign: 'left',
    //fontWeight: 'bold',
    margin: '6px 0px 0px 0px'
    }, 
  });
  leftpanel.add(vdNote);
  
  var str = ee.String(selectLc.getValue());
  var codeList = str.split(',');
  var forestCode = ee.Number.parse(codeList.get(0));
  var otherVegCode = ee.Number.parse(codeList.get(1));
  var bareCode = ee.Number.parse(codeList.get(2));
  
  var vdBare = rgbPcIndices.select('pc1').updateMask(classifiedImage.eq(bareCode)).rename('Bare');
  var vdVeg = rgbPcIndices.select('pc1').updateMask(classifiedImage.eq(forestCode).or(classifiedImage.eq(otherVegCode))).rename('Veg');
  leftpanel.add(ui.Chart.image.histogram(vdVeg.addBands(vdBare), ee.FeatureCollection(roiPath.getValue()), 30));
};

//VD Function
var getVd = function(rgbPcIndices, classifiedImage){
  var vdMask = rgbPcIndices.select('pc1')
                           .gt(parseFloat(vdMin.getValue()))
                           .and(rgbPcIndices.select('pc1')
                           .lt(parseFloat(vdMax.getValue())));
                           
  var vdInVeg = rgbPcIndices.select('pc1').updateMask(vdMask.eq(1));

  var vdFinal = vdInVeg.unitScale(
                vdInVeg.reduceRegion(ee.Reducer.min(), ee.FeatureCollection(roiPath.getValue()), 30).get('pc1'), 
                vdInVeg.reduceRegion(ee.Reducer.max(), ee.FeatureCollection(roiPath.getValue()), 30).get('pc1')
                ).multiply(100).rename('vd');
  
  leftpanel.add(ui.Chart.image.histogram(vdFinal, ee.FeatureCollection(roiPath.getValue()), 30));
  Map.addLayer(vdFinal, {min:0, max:100}, "VD", false);

return vdFinal;
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 5 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 5: Compute VD/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 5 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑










//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 6 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 6: Compute SSI/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 6 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//SI Stats
var siStats = function(rgbPcIndices, classifiedImage){
  var str = ee.String(selectLc.getValue());
  var codeList = str.split(',');
  var forestCode = ee.Number.parse(codeList.get(0));
  
  var si = rgbPcIndices.select("si");
  var siInForest = si.updateMask(classifiedImage.eq(forestCode));

  var sdSI = siInForest.reduceRegion(ee.Reducer.stdDev(), ee.FeatureCollection(roiPath.getValue()), ee.Image(imagePath.getValue()).projection().nominalScale());
  var meanSI = siInForest.reduceRegion(ee.Reducer.mean(), ee.FeatureCollection(roiPath.getValue()), ee.Image(imagePath.getValue()).projection().nominalScale());

  var minus2sd = ee.Number(meanSI.get('si')).subtract((ee.Number(sdSI.get('si'))).multiply(2));
                 
  var plus2sd = ee.Number(meanSI.get('si')).add((ee.Number(sdSI.get('si'))).multiply(2));

  var siNote = ui.Label({
    value: 'Use the information below to select the appropriate minimum and maximum values for Scaled Shadow Index. ' + 
        'If tree cover is classified with high accuracy use the Shadow Index minimum and max. ' + 
        'But in most cases there will be misclassification and effects of topographic shadow and haze. ' + 
        'So if unsure use minimum around (mean - standard devition * 2) and maximum around (mean + standard devition * 2). ' + 
        'For this dataset:- ', 
    style: {
    width: '100%',
    fontSize: '16px',
    border: '1px solid black',
    textAlign: 'left',
    margin: '6px 0px 0px 0px'
    }, 
  });
  leftpanel.add(siNote);

  var siNote1 = ui.Label({
    value: minus2sd.evaluate(function(value){
          return siNote1.setValue('Mean - Standard Deviation * 2 = ' + value.toFixed(3)); 
        }),
    style: {
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '6px 0px 0px 0px'
    }, 
  });
  leftpanel.add(siNote1);
  
  var siNote2 = ui.Label({
    value: plus2sd.evaluate(function(value){
          return siNote2.setValue('Mean + Standard Deviation * 2 = ' + value.toFixed(3)); 
        }),
    style: {
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '6px 0px 0px 0px'
    }, 
  });
  leftpanel.add(siNote2);
  
  leftpanel.add(ui.Chart.image.histogram(siInForest, ee.FeatureCollection(roiPath.getValue()), 30));
};


//SSI Function
var computeSSI = function(rgbPcIndices, classifiedImage){
  var str = ee.String(selectLc.getValue());
  var codeList = str.split(',');
  var forestCode = ee.Number.parse(codeList.get(0));
  var si = rgbPcIndices.select("si");
  var siInForest = si.updateMask(classifiedImage.eq(forestCode));

  
  var siMask = siInForest.gt(parseFloat(siMin.getValue())).and(siInForest.lt(parseFloat(siMax.getValue())));
  var siInForest2 = siInForest.updateMask(siMask.eq(1));
  
  var ssi = siInForest2
            .unitScale(
              siInForest2.reduceRegion(ee.Reducer.min(), ee.FeatureCollection(roiPath.getValue()), 30).get('si'), 
              siInForest2.reduceRegion(ee.Reducer.max(), ee.FeatureCollection(roiPath.getValue()), 30).get('si')
              ).multiply(100).rename('ssi');
  
  leftpanel.add(ui.Chart.image.histogram(ssi, ee.FeatureCollection(roiPath.getValue()), 30));
  
  Map.addLayer(ssi, {min:0, max:100}, "SSI", false);
  
return ssi;
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 6 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 6: Compute SSI/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 6 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑








//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 7 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 7: Compute FCC/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 7 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var computeFcc = function(vd, ssi){
  var fcc = ((((vd.multiply(ssi)).subtract(1)).sqrt()).subtract(1)).rename('canopy_cover');
  leftpanel.add(ui.Chart.image.histogram(fcc, ee.FeatureCollection(roiPath.getValue()), 30));
  Map.addLayer(fcc, {min:0 , max:100, palette:['red', 'yellow', 'green']}, 'Tree Canopy Cover');
  
  // Export the image to an Earth Engine asset.
  var exportToAssetButton = ui.Button({
    label: 'Export Canopy Cover Image to Assests',
    onClick: function(){
      Export.image.toAsset({
        image: fcc,
        description: 'FCC_Image',
        region: ee.FeatureCollection(roiPath.getValue()),
        assetId: 'FCC_Image',
        scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
        maxPixels: 10000000000000
      });
    }
  });
  
  var exportToDriveButton = ui.Button({
    label: 'Export FCC Image to Drive',
    onClick: function(){
      Export.image.toDrive({
        image: fcc,
        description: 'FCC_Image',
        region: ee.FeatureCollection(roiPath.getValue()),
        scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
        maxPixels: 10000000000000
      });
    }
  });
  //rightpanel.add(exportToDriveButton);
  //rightpanel.add(exportToAssetButton);
  
  // Define a function to generate a download URL of the image for the
  // viewport region. 
  function downloadImg() {
    var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
    var downloadArgs = {
      name: 'CanopyCover_Image',
      scale: ee.Image(imagePath.getValue()).projection().nominalScale(),
      region: viewBounds.toGeoJSONString()
   };
  
  var url = fcc.getDownloadURL(downloadArgs);
  urlLabel.setUrl(url);
  urlLabel.style().set({shown: true});
  }

// Add UI elements to the Map.
  var downloadButton = ui.Button('Download Canopy Cover Image', downloadImg);
  var urlLabel = ui.Label('Download', {shown: false});
  var panel = ui.Panel([downloadButton, urlLabel]);
  Map.add(panel);
    
  var downloadNote = ui.Label({
    value: 'You can download the canopy cover image inside the map view using the download button. ' + 
           'Note that the total request size is ~50 Mb. ' + 
           'Zoom in to a specific area to reduce the download size',
    style: {
    width: '100%',
    fontSize: '16px',
    textAlign: 'left',
    border: '1px solid black',
    margin: '6px 0px 0px 0px'
    }, 
  });
  leftpanel.add(downloadNote);
  
return fcc;
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 7 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 7: Compute FCC/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 7 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑










//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 8 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Step 8: Accuracy Assessment/////
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓STEP 8 STEP 8 START↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var assessAccuracy = function(fccImage, validationSamples){
  var sampleFcc = fccImage.sampleRegions({
    collection: validationSamples, 
    scale: fccImage.projection().nominalScale(),
    geometries: true
  });
  
  var accuracyLabel = ui.Label({
  value: 'Accuray Assessment', 
  style: {
    width: '100%',
    fontSize: '25px',
    backgroundColor: 'grey',
    textAlign: 'center',
    border: '1px solid black',
    fontWeight: 'bold',
    margin: '0px'
    }, 
  });
  leftpanel.add(accuracyLabel);
  
  var fccVsValid = ui.Chart.feature.byFeature(sampleFcc, selectValCol.getValue(), 'canopy_cover')
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Relationship between Validation Samples and Computed Canopy Cover',
      pointSize: 3,
      hAxis: {title: 'Validation Samples'},
      vAxis: {title: 'Computed Canopy Cover'},
      trendlines:{
        0: {
          type: 'linear',
          color: 'red',
          visibleInLegend: true,
          lineWidth: 30,
          opacity: 0.2,
          showR2: true
          }
      }
    });
   
  leftpanel.add(fccVsValid); 
  
  var computeResiduals = function(feature){
    feature = ee.Feature(feature);
    var residual = feature.set({
      'residuals': feature.getNumber(selectValCol.getValue())
                  .subtract(feature.getNumber('canopy_cover'))
    });
  return residual;
  };
  
  var residuals = sampleFcc.map(computeResiduals);
  
  var fccVsResiduals = ui.Chart.feature.byFeature(residuals, 'canopy_cover', 'residuals')
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Relationship between Computed Computed Canopy Cover and Residuals',
      pointSize: 3,
      hAxis: {title: 'Computed CC'},
      vAxis: {title: 'Residuals'},
      trendlines:{
        0: {
          type: 'linear',
          color: 'red',
          visibleInLegend: true,
          lineWidth: 30,
          opacity: 0.2,
          showR2: true
          }
      }
    });
   
  leftpanel.add(fccVsResiduals); 
  leftpanel.add(ui.Chart.feature.histogram(residuals, 'residuals'));
  
  var residualBuffer = residuals.map(function(feature){
    feature = ee.Feature(feature);
    return feature.buffer(1000);
  });

  var residualRaster = residualBuffer.reduceToImage(['residuals'], ee.Reducer.mean()).rename('residual');
  
  
  Map.addLayer(residualRaster, {min: -65, max: 65, palette:['#002bff', '#04ff00', '#ff0000']}, 'Residuals');
  Map.addLayer(validationSamples, {}, 'Imported Samples', false);
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 8 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//Step 8: Accuracy Assessment/////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑STEP 8 END↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
rescaleBandsComputeIndicesButton.onClick(function(){
  var waterMaskedImage = waterMask();
  var rescaledBandsWithIndices = rescaleImageAddIndices(waterMaskedImage);
  var runCorelation = corelation(rescaledBandsWithIndices);
  rightpanel.add(selectVI);
  rightpanel.add(pcButton);
  
  pcButton.onClick(function(){
    var pcaImage = pca(rescaledBandsWithIndices);
    vdStats(pcaImage, ee.Image(classifiedPath.getValue()));
    rightpanel.add(vdMin);
    rightpanel.add(vdMax);
    rightpanel.add(vdButton);
    
    vdButton.onClick(function(){
      var vd = getVd(pcaImage, ee.Image(classifiedPath.getValue()));
      siStats(pcaImage, ee.Image(classifiedPath.getValue()));
      rightpanel.add(siMin);
      rightpanel.add(siMax);
      rightpanel.add(ssiButton);
      
      ssiButton.onClick(function(){
        var ssi = computeSSI(rescaledBandsWithIndices, ee.Image(classifiedPath.getValue()));
        var fcc = computeFcc(vd, ssi);
        rightpanel.add(askAccuracyAssess);
        
        runAccuracyAssess.onClick(function(){
          assessAccuracy(fcc, ee.FeatureCollection(validPath.getValue()));
        });
      });
    });
  });
});

askAccuracyAssess.onClick(function(){
  rightpanel.add(validPath);
  rightpanel.add(selectValCol);
  rightpanel.add(runAccuracyAssess);
});

rightpanel.add(rescaleBandsComputeIndicesButton);
