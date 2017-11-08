/*(cc) Creative Commons CC-BY-NC Bruno.Bogaert [at] univ-lille1.fr
*/

/*
 * VliveImageColors class
 *   Image displaying bicycle and free plug counts
 *   Background color depends on value (koColor for n=0, warningColor for n<=2, okColor otherwise)
 *   ready to get Leaflet Icon
 *   
 * ==> see also VliveImage class
 * 
 * usage  :
 * create new Image File:
 *     var vIcIm = new VliveIcon(nbVelos, nbPlaces, okColor, koColor, warningColor);
 * get Leaflet Icon, to use on Leaflet maps
 *     vIcIm.getLeafletIcon();
 * get blob URL :
 *     icon.getURL();
 */

class VliveImageColors{
  constructor(velos,places,okColor,koColor,warningColor){
   this.okColor = okColor;
   this.koColor = koColor;
   this.warningColor = warningColor;
   var svgDoc= new DOMParser().parseFromString(VliveImageColors.svgSource,'image/svg+xml');
   svgDoc.querySelector('#velos-tspan').textContent = velos+' v';
   svgDoc.querySelector('#places-tspan').textContent = places+' p';
   svgDoc.querySelector('#velos-zone').style.fill = this.getColor(velos);
   svgDoc.querySelector('#places-zone').style.fill = this.getColor(places);
   this.blob = new Blob([new XMLSerializer().serializeToString(svgDoc)],{type:'image/svg+xml'});
   this.url = window.URL.createObjectURL(this.blob);
  };
  getColor(i){
   if (i==0)
      return this.koColor;
   else if (i<=2)
      return this.warningColor;
   else 
      return this.okColor;
  }
  getURL(){
    return this.url;
  }
  getLeafletIcon(){ // needs Leaflet library
    return L.icon({iconUrl: this.getURL(), iconSize: [27,41], iconAnchor: [13.5, 41]});
  }
}
/* 
*/
/*
 * VliveImage class
 * VliveImageColors extension  with preset colors
 *
 * usage  :
 * create new Image File:
 *     var vIcIm = new VliveIcon(nbVelos, nbPlace);
 * get Leaflet Icon, to use on Leaflet maps
 *     vIcIm.getLeafletIcon();
 * get blob URL :
 *     icon.getURL();
 */
class VliveImage extends VliveImageColors{
  constructor(velos, places){
    super(velos,places,"#43ff6c","#ff5543","orange");
  }
}

/* static value of original SVG source
 */
VliveImageColors.svgSource=`
<!-- <?xml version="1.0" encoding="UTF-8" standalone="no"?>-->
<!-- (cc) Creative Commons CC-BY-NC Bruno.Bogaert [at] univ-lille1.fr -->
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xml:space="preserve"
   enable-background="new 0 0 512 512"
   viewBox="0 0 271.46637 410.60211"
   y="0px"
   x="0px"
   id="Layer_1"
   version="1.1">
   <metadata id="metadata9">
        <rdf:RDF>
        <cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title></cc:Work>
        </rdf:RDF>
   </metadata>
   <defs id="defs7">
     <style xmlns="http://www.w3.org/2000/svg" type="text/css">
     rect { opacity:0.8;}
     text {text-anchor:middle;
     font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;
     font-size:100px;font-family:sans-serif;
     line-height:125%;
     }
     </style>
   </defs>
<g transform="translate(-120.29433,-24.225993)" id="g4179">
   <rect
       rx="50"
       y="159.37259"
       x="129.62825"
       height="121.19091"
       width="255.42136"
       id="places-zone"
      />
   <rect
       id="velos-zone"
       width="255.42136"
       height="121.19091"
       x="129.62825"
       y="39.372604"
       rx="50"
       />
   <path
       d="m 310.75781,24.228516 c -43.73258,0.956676 -86.65642,-0.763725 -128.64843,0.763672 -31.76089,3.973511 -60.80543,34.760318 -61.39844,66.458984 -0.003,0.14458 -0.007,0.289121 -0.0137,0.433594 -1.05656,25.005514 0.37,51.217064 -0.23829,78.431644 5.3e-4,0.0645 -5e-4,0.12299 0,0.1875 0.19206,24.66783 -1.12944,47.88155 1.57227,69.16406 6.45148,30.46254 37.57089,56.22145 68.48828,55.92187 8.20538,-0.85155 16.24563,2.65018 21.11328,9.23633 17.28221,41.59691 30.00737,86.92099 44.36722,130.00195 14.08001,-42.24061 28.16069,-84.48016 42.23828,-126.7207 2.66034,-7.98153 10.39369,-13.14352 18.78516,-12.53906 34.97705,2.52244 71.74341,-28.56616 73.97656,-63.6875 0.007,-0.11596 0.0158,-0.23186 0.0254,-0.34766 1.76243,-21.33923 -0.307,-44.66865 0.52149,-69.74609 l -0.01,0.78711 c -0.27517,-28.2878 1.13591,-55.40575 -1.28516,-80.904298 -5.81759,-30.452151 -36.42505,-56.944173 -67.39648,-57.19336 -0.29772,-0.0025 -0.59533,-0.01232 -0.89258,-0.0293 -3.47524,-0.197046 -7.47412,-0.239772 -11.49414,-0.214844 l 0.28906,-0.0039 z M 192.79688,39.402344 c 0.0469,4.88e-4 0.0937,0.0012 0.14062,0.002 42.66511,0.797035 86.07208,-0.606096 130.10547,0.650391 l -0.61328,-0.0059 c 34.01879,-0.162194 57.52536,31.094739 53.96093,62.765625 -0.48499,42.6768 1.13566,86.25004 -0.88281,130.47461 -0.0443,0.97293 -0.1658,1.94081 -0.36328,2.89453 -6.12438,29.56407 -34.49577,47.65776 -63.14844,44.20313 -42.10693,-0.36291 -84.90635,0.91227 -128.27343,-0.70508 -0.86422,-0.0325 -1.72508,-0.1258 -2.57618,-0.2793 -30.25158,-5.44797 -49.0572,-34.26728 -45.5332,-63.39453 0.46258,-42.26417 -1.13664,-85.42427 0.88672,-129.236329 0.0451,-0.980291 0.16856,-1.955404 0.36914,-2.916015 5.556,-26.580622 29.33093,-44.747642 55.92774,-44.453132 z"
       id="path3343" />
  <text
       xml:space="preserve"
       x="148.44067"
       y="136.67798"
       id="velos"><tspan
         id="velos-tspan"
         x="257.44067"
         y="136.67798" text-anchor="middle">#velos#</tspan></text>
  <text
       id="places"
       y="252.67798"
       x="148.44067"
       style="text-anchor:middle;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:100px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       xml:space="preserve"><tspan
         id="places-tspan"
         x="257.44067"
         y="252.67798" text-anchor="middle">#places#</tspan></text>
</g></svg>
`;

