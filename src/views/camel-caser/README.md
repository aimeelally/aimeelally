#Caramello Camel Caser
This is the Caramello Camel Caser

##Features
1. Standard camel caser which strips white spaces and capitalises first letter of every word EXCEPT first

##Advanced features
1. strip special characters
2. strip numbers
3. strip html
4. capitalise first letter
5. allow for multiple lines
6. return result as object
7. copy to clipboard
8. remember my selections

##Known issues
- comments don't get parsed correctly because they have "<" symbols
- if a parameter in the html has a ">" symbol e.g. ng-class="$ctrl.number > 4 'open' : 'closed'"
  this also ends up in the output object