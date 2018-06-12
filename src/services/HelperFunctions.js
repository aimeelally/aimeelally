export default [
  function(){
  var that= {
        object:{
          convertToArray:convertToArray //underscore?
        },
        array:{
          isArray:isArray, //underscore?
          getByKey:getByKey, //underscore?
          sortByKey:sortByKey, //underscore?
          getQuartiles: getQuartiles,
          deepIntersection: deepIntersection
        },
        date:{
          protectAgainstSeconds: protectAgainstSeconds,
          getFullDateText: getFullDateText, //this one
          getTimeMinSec: getTimeMinSec,
          getTimeHourMin: getTimeHourMin,
          getTimeHourMinSec: getTimeHourMinSec,
          getDay: getDay,
          getDateAndMonth: getDateAndMonth, //this one
          getDateFormatForAssignment: getDateFormatForAssignment, //this one
          getDateFormat: getDateFormat, //this one
          getDayMS: getDayMS,  //this one
          getDateAndMonthMS: getDateAndMonthMS,
          getDateFormatMS: getDateFormatMS,
          getDayNames: getDayNames,
          getMonthNames: getMonthNames,
          getDateMS: getDateMS,
          getMonthMS: getMonthMS, //month string
          getFormattedMonthNumMS: getFormattedMonthNumMS, //month number, if less than 10 put 0 in front of num
          getTermOptionsFromCreationDate: getTermOptionsFromCreationDate
        },
        nodelist:{
          forEach: nodelistForEach //underscore?
        },
        grades:{
          convertPercentageToGrade: convertPercentageToGrade,
          getGradeForAssignment: getGradeForAssignment
        },
        string:{
          getSimilarity:getSimilarity
        },
        misc:{
          debounce: debounce
        }
      };

  function convertToArray(objectToTurnIntoArray){
    return Object.keys(objectToTurnIntoArray).map(function (key){
      return objectToTurnIntoArray[key];
    });
  }

  function isArray(element){
    //aimee - read about this
    return Object.prototype.toString.call(element) === '[object Array]';
  }

  function getByKey(array, key, value){
    //aimee - is array really an array??
    var elementNeeded;
    array.forEach(function(element){
      if ( element[key] === value ){
        elementNeeded = element;
      }
    });
    return elementNeeded;
  }

  function sortByKey(array, key){
    return array.sort(function (a, b){
      var x = a[key],
          y = b[key];
      if (typeof x == 'string'){
        x = x.toLowerCase();
        y = y.toLowerCase();
      }
      return ((x > y) ? 1 : (x < y) ? -1 : 0);
    });
  }

  function deepIntersection() {
    console.warn('deepIntersection depricated, use lodash');
  }


  function protectAgainstSeconds(date){
    if (date < 140000000000){
      return date * 1000;
    }
    return date;
  }

  function getMonthNames(){
    return monthNames;
  }

  function getDayNames(){
    return dayNames;
  }

  function getFullDateText(date){
    var dateString = '';
    if (typeof date === 'number'){
      date = new Date(date);
    }
    //add dot after number if raabe slovakia
    if(publisher === 'slovakia') {
      dateString = '' + date.getDate() + '. ' + monthNames[date.getMonth()] + ' ' + (date.getYear() + 1900);
    }
    else {
      dateString = '' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + (date.getYear() + 1900);
    }
    
    return dateString;
  }

  function getTimeMinSec(date){
    //add a zero if time < 10
    function addZero(i) {
      if (i < 10) {
          i = '0' + i;
      }
      return i;
    }
    var d = new Date(date*1000);
    return addZero(d.getMinutes()) + 'm ' + addZero(d.getSeconds()) + 's';
  }

  function getTimeHourMin(date){
    //add a zero if time < 10
    function addZero(i) {
      if (i < 10) {
          i = '0' + i;
      }
      return i;
    }
    var d = new Date(date*1000);
    return addZero(d.getHours()) + ':' + addZero(d.getMinutes());
  }

  function getTimeHourMinSec(date){
    //add a zero if time < 10
    function addZero(i) {
      if (i < 10) {
          i = '0' + i;
      }
      return i;
    }
    var d = new Date(date*1000);
    return addZero(d.getHours()) + 'h ' + addZero(d.getMinutes()) + 'm ' + addZero(d.getSeconds()) + 's';
  }

  function getDay(date){
   var d;
    if (typeof date === 'number'){
       if(date<=99999999999){
         d = new Date(date*1000);
         console.warn('date.getDay called with seconds, converting to ms');
       }
       else if ( (date>=100000000000) && (date <= 99999999999999) ){
           d =new Date(date);
       }
       else{
         console.warn('date.getDay was called with an unreasonable value: ', date);
         return;
       }
    }
    else if ((typeof date === 'object') && date.getDay){
        d = date;
    }
    else{
      console.warn('date.getDay: invalid input', date);
      return;
    }
    return dayNames[d.getDay()];
  }

  function getDateMS(dateInMs){
    var d = new Date(dateInMs);
    return d.getDate();
  }

  function getDayMS(dateInMs){
    console.warn('date.getDayMS: this function doesnt exist anymore use date.getDay');
    return getDay(dateInMs);
  }

  function getMonthMS(dateInMs){
    var d = new Date(dateInMs);
    return monthNames[(d.getMonth())];
  }

  function getMonthNumMS(dateInMs){
    var d = new Date(dateInMs);
    //need to add 1 to the getMonth() function,
    //as the months are returned as an array number
    //so December is returning as 11 instead of 12
    return d.getMonth() + 1;
  }

  function getFormattedMonthNumMS(dateInMs){
    var monthNum = getMonthNumMS(dateInMs);
    if(monthNum < 10){
      monthNum = '0' + monthNum;
    }
    return monthNum;
  }

  function getTermOptionsFromCreationDate(creationDate, currentDate){
    var termSelector=[];
    creationDate = new Date(protectAgainstSeconds(creationDate));
    currentDate = new Date(protectAgainstSeconds(currentDate));
       
    var yearCreationClass=creationDate.getFullYear();
    var termClass=yearCreationClass+'/'+(yearCreationClass+1).toString().substring(2, 4);
    var currentYear =new Date(currentDate).getFullYear();
    var beginningCurrentAcademicYear=currentYear+'-08-01';
    beginningCurrentAcademicYear = new Date(beginningCurrentAcademicYear);

    if (Number(yearCreationClass)>Number(currentYear)){
        termSelector.push(termClass);
    }else {
      if (currentDate.getTime()<beginningCurrentAcademicYear.getTime()){
        termSelector.push(termClass);    
      }else{
        var initYear=Number(yearCreationClass); 
        var lastYear=Number(currentYear);
        var acadamicYearForYearCreationClass=new Date(Number(yearCreationClass)+'-08-01').getTime();
        if (creationDate.getTime()<acadamicYearForYearCreationClass){
          initYear=Number(yearCreationClass)-1;
        }    
        
        for(var i=initYear;i<=lastYear;i++){
          var secondPartTerm=i+1;
          var newTerm=i.toString()+'/'+secondPartTerm.toString().substring(2, 4);
          termSelector.push(newTerm);
        }
      } 
    }
    return termSelector;
  }


  function getDateAndMonth(date){
    var d = new Date(protectAgainstSeconds(date));
    if(publisher === 'klett' || publisher === 'slovakia'){
      return d.getDate() + '. ' + monthNames[(d.getMonth())];
    }
    return d.getDate() + ' ' + monthNames[(d.getMonth())];
  }

  function getDateAndMonthMS(dateInMs){
    return getDateAndMonth(dateInMs);
  }

  /*If assignment finishes in 7 days or less the 'day' will be displayed.
    If 7 days or greater, the 'date and month' are displayed. */
  function getDateFormatForAssignment(dateAssignmentFinishes){
    // if (dateAssignmentFinishes < //1sa jan 1990){
    //   console.log('This date looks like it's in seconds');
    // }
    var todaysDatePlusSevenDays = (new Date().getTime())/1000 + 604800;
    dateAssignmentFinishes = dateAssignmentFinishes;
    if (todaysDatePlusSevenDays >= dateAssignmentFinishes){
      return getDay(dateAssignmentFinishes);
    }
    else{
      return getDateAndMonth(dateAssignmentFinishes);
    }
  }

  /*If  7 days or less the 'day' will be displayed.
    If 7 days or greater, the 'date and month' are displayed. */
  function getDateFormat(dateToFormat){
    var todaysDatePlusSevenDays = new Date().getTime() + 604800;
    dateToFormat = dateToFormat;
    if (todaysDatePlusSevenDays <= dateToFormat){
      return getDay(dateToFormat);
    }
    else{
      return getDateAndMonth(dateToFormat);
    }
  }

  function getDateFormatMS(dateToFormatInMs){
    var todaysDatePlusSevenDays = Math.round((new Date().getTime()) + 7*24*60*60*1000);
    var todaysDate = new Date().getTime();
    var dateToFormat = dateToFormatInMs;
    if (todaysDatePlusSevenDays >= dateToFormat && dateToFormat > todaysDate){
      return getDay(dateToFormat);
    }
    else{
      return getDateAndMonthMS(dateToFormat);
    }
  }

  function nodelistForEach(arrayLikeObject, callback, scope) {
    for (var i = 0; i < arrayLikeObject.length; i++) {
      callback.call(scope, arrayLikeObject[i], i);
    }
  }

  function convertPercentageToGrade(percent){
    if (percent >= 85){
      return 'a';
    }
    if (percent >= 70){
      return 'b';
    }
    if (percent >= 60){
      return 'c';
    }
    return 'ng';

  }//convertPercentageToGrade

  function getGradeForAssignment(lessons){
    if (!lessons){
      throw new Error('HelperFunctions->getGradeForAssignment: lessons not specified');
    }
    if (!lessons.length){
      //no lessons, grade cannot be calculated
      return;
    }
    var conceptsObj = {},
        conceptsArr = [],
        numbGrades = 0,
        gradeAccumulator = 0;
    //get unique concepts
    lessons.forEach(function(lesson){
      conceptsObj['concept-' + lesson.concept_id] = {id: lesson.concept_id, grade: 0};
    });
    //get max grade for each concept
    conceptsArr = convertToArray(conceptsObj);
    conceptsArr.forEach(function(concept){
      var maxGrade = 0;
      lessons.forEach(function(lesson){
        maxGrade = (lesson.concept_id === concept.id && Number(lesson.ability) > Number(maxGrade)) ? Number(lesson.ability) : maxGrade;
      });
      concept.grade = Number(maxGrade);
    });
    //get average of grades above 60
    conceptsArr.forEach(function(concept){
      if (concept.grade >= 60){
        numbGrades += 1;
        gradeAccumulator += Number(concept.grade);
      }
    });

    return Math.floor(gradeAccumulator/numbGrades + 0.5);
  } //getGradeForAssignment

  function getMedian(medianArr) {
    var count = medianArr.length,
        median;
    if (count === 0){
      return 0;
    }

    //John: there's probably a redundant line of code here. Maybe learn how to calculate medians yourself
    median = (count % 2 === 0) ? (medianArr[(medianArr.length/2) - 1] + medianArr[(medianArr.length / 2)]) / 2:medianArr[Math.floor(medianArr.length / 2)];
    median = Math.floor(median + 0.5);

    return median;
  }//getMedian

  function fakeAkwardQuartileValues(values){
    if (values.length === 0){
      return {
        q1:0,
        q2:0,
        q3:0
      };
    }
    if (values.length === 1){
      return {
        q1:values[0],
        q2:values[0],
        q3:values[0]
      };
    }
    if (values.length === 2){
      return {
        q1:values[0],
        q2:values[1],
        q3:values[1]
      };
    }
    if (values.length === 3){
      return {
        q1:values[0],
        q2:values[1],
        q3:values[2]
      };
    }
    throw new Error('We have no plan to deal with this akward quartile calculation');
  }

  function getQuartiles(values){
    var q1=0,
        q2=0,
        q3=0,
        q1Arr,
        q2Arr,
        q3Arr;

    if (values.length <= 3){
      return fakeAkwardQuartileValues(values);
    }


    values = values.sort();
    q1Arr = (values.length % 2 === 0) ? values.slice(0, (values.length / 2)) : values.slice(0, Math.floor(values.length / 2));
    q2Arr =  values;
    q3Arr = (values.length % 2 === 0) ? values.slice((values.length / 2), values.length) : values.slice(Math.ceil(values.length / 2), values.length);
    q1 = getMedian(q1Arr);
    q2 = getMedian(q2Arr);
    q3 = getMedian(q3Arr);
    q3 = q3 < q2 ? q2 : q3;

    return {
      q1:q1,
      q2:q2,
      q3:q3
    };
  }//getQuartiles

  function getSimilarity(s1, s2){
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i === 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  return that;
}];
