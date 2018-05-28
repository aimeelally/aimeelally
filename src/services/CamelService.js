
export default [function(){
  var that =  {
                
                stripHTML: stripHTML,
                convertToCamelCase: convertToCamelCase,
                stripNumbers: stripNumbers,
                capitaliseFirstLetter: capitaliseFirstLetter,
                stripSpecialCharacters: stripSpecialCharacters,
                getArrayOfTextFromStrippedHtml: getArrayOfTextFromStrippedHtml

              };


  function stripHTML(str) {
    var strippedHTML = str.replace(/(<([^>]+)>)/ig,"\n");
    var stripDoubleBrackets = strippedHTML.replace(/({{.+}})/g,"\n").trim();
    var stripExtraLinesFromCleanInput = stripDoubleBrackets.replace(/\s\s+/g, "\n");
    
    return stripExtraLinesFromCleanInput;
  }

  function getArrayOfTextFromStrippedHtml(strippedHtml) {
    var arrayOfSentencesSplitAtNewLine = strippedHtml.replace(/\s\s+/g, "\n").split(/\r?\n/);
 
    return arrayOfSentencesSplitAtNewLine;
  }

  function convertToCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, 
      function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        // lowercases first letter
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
  }

  function stripNumbers(str) {
    return str.replace(/[0-9]/g, "");
  }

  function capitaliseFirstLetter(str) {
    return str.replace(/^[a-z]/, (u) => u.toUpperCase());
  }

  function stripSpecialCharacters(str) {
    return str.replace(/([{}\[\]<>\?£|=#!@:;#$%\/\"\'^&-._,*])/g, "");
  }

 
  return that;

}];
