# Add a function to Built in Functions 
if you want to add a built in function you may add it in under src/lib folder considering what the categorie of the function you want to add :
 - (Http Module File)[./../../src/lib/http.js] : if it's a http related function.
 - (Standard Module File)[./../../src/lib/standard.js] : if it's a standard function.
 - (System Module File)[./../../src/lib/system.js] : if it's a System related function.
 - (Types Module File)[./../../src/lib/types.js] : if it's a function that do sometimes related to types.
then add it to module.export 
-----------------------------------------------------------------------------------------------
When you add your function you must go to the auto-import file and add a property to the map object as below :
[key]=> name of the function 
[value]=> name of the module which contain the function 

