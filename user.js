// ==UserScript==
// @name         immobilienscout24
// @namespace    http://tampermonkey.net/
// @version      0.6.9.2
// @updateURL    https://raw.githubusercontent.com/Happyarms/immobiliensout24/master/user.js
// @downloadURL  https://raw.githubusercontent.com/Happyarms/immobiliensout24/master/user.js
// @description  try to take over the world!
// @author       Dennis Gloger
// @match        https://*.immobilienscout24.de/Suche/*/haus-kaufen*
// @grant        none
// @run-at document-end
// ==/UserScript==


function custom_filter(){
    var energiewert = '123';
    var preis = '123';
    var preis2 = '123';
    var preis3 = '123';
    var gesamtpreis = '123';
    var quadradmeter = '123';
    var entfernungskosten = '123';
    var content = '';
    var tabelle = '';


    // Tabelle vorbereiten
    tabelle = '<table id="ergebnistabelle">';
    tabelle += '<thead><tr>';
    tabelle += '<td>Name</td>';
    tabelle += '<td>Fahrkosten</td>';
    tabelle += '<td>Kreditrate</td>';
    tabelle += '<td>Heizkosten</td>';
    tabelle += '<td>Energiewert</td>';
    tabelle += '<td>Kaufpreis</td>';
    tabelle += '<td>Gesamt</td>';
    tabelle += '<td>Zimmeranzahl</td>';
    tabelle += '<td>Wohnfläche</td>';
    tabelle += '<td>Grundstück</td>';
    tabelle += '</tr></thead><tbody><tr>';
    tabelle += '</tr></tbody></table>';
    $('#resultlistpage').prepend(tabelle);
    //
$('.font-white').each(function(blubb,e){
    $(this).parent().fadeOut(100);
});
$('.result-list-entry__address .font-ellipsis').each(function(blubb,e){

    if($(this).text().toUpperCase().indexOf("X,") >= 0){
        $(this).parent().parent().parent().parent().parent().parent().parent().fadeOut(300);
        //$(this).parent().parent().parent().parent().parent().parent().parent().addClass('Blubber');
    }
});


    $('.result-list-entry__data > a').each(function(blubb,e){

/*console.log($(this).parent().parent().prev().css("background-color"));
        if($(this).parent().parent().prev().css("color") == 'gba(0, 0, 0, 0)'){
            $(this).parent().parent().parent().fadeOut(2000);
        }*/
       $.get($(this).attr('href'), function(data, status){
           preis = $(e).parent().children().children().children().children('.result-list-entry__primary-criterion:first').children('dd');
           preis2 = preis.text().replace('€','').replace('.','');

           quadradmeter = $(e).parent().children().children().children().children('.result-list-entry__primary-criterion:nth-child(2)').children('dd').text();

           if($(data).find('.is24qa-endenergiebedarf').length > 0){
               energiewert = $(data).find('.is24qa-endenergiebedarf').text();
           }else{
               energiewert = '150';
           }
           $(preis).parent().parent().prepend('<div style=";width: 100%;"></div>');
           $(preis).parent().parent().prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(energiewert)+'</dd><dt class="font-s onlyLarge">Energiewert</dt></dl>');
           energiewert = energiewert.replace(' kWh/(m²*a)','')
           energiewert = (parseFloat(energiewert) * parseFloat(quadradmeter)) / 12 / 11;
           //console.log(quadradmeter);
           //$(e).next().append(parseInt(energiewert));
           preis2 = (parseInt(preis2)+27000) / 250;
           preis3 = preis2;
           $(preis).parent().parent().prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(energiewert)+'</dd><dt class="font-s onlyLarge">Heizkosten</dt></dl>');
           //$(preis).parent().parent().prepend('<div style=";width: 100%;"></div>');
           $(preis).parent().parent().prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+preis2+'</dd><dt class="font-s onlyLarge">Kreditrate</dt></dl>');
           preis2 = parseInt(preis2) + parseInt(energiewert);

           //$(preis).append('<br />ca.: '+ preis2);

           entfernungskosten = $(e).next().children('div:first').text().replace(' km|','');
           entfernungskosten = (parseFloat(entfernungskosten) * 40) * 0.3;
           //
           $(preis).parent().parent().prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(entfernungskosten)+'</dd><dt class="font-s onlyLarge">Fahrkosten</dt></dl>');
           //$(preis).append('<br />Farkost.: '+ parseInt(entfernungskosten));
           //
           entfernungskosten = parseFloat(entfernungskosten) + parseInt(preis2);
           //
           $(preis).parent().parent().append('<div style=";width: 100%;"></div>');
           $(preis).parent().parent().append('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(entfernungskosten)+'</dd><dt class="font-s onlyLarge">Gesamt</dt></dl>');
           //$(preis).append('<br />Gesamt.: '+ entfernungskosten);
           //

           // Inhalt der Tabelle aufbauen und befüllen
  /*         tabelle += '<tr><td>ddd'+parseInt(entfernungskosten)+'</td>'; //Name
           tabelle += '<td>'+(parseFloat(entfernungskosten) * 40) * 0.3+'</td>'; //Fahrkosten
           tabelle += '<td>'+preis3+'</td>'; //Kreditrate
           tabelle += '<td>'+parseInt(energiewert)+'</td>'; //Heizkosten
           tabelle += '<td>'+preis2+'</td>'; //Energiewert
           tabelle += '<td>'+parseInt(entfernungskosten)+'</td>'; //Kaufpreis
           tabelle += '<td>'+parseInt(entfernungskosten)+'</td>'; //Gesamt
           tabelle += '<td>'+parseInt(entfernungskosten)+'</td>'; //Zimmeranzahl
           tabelle += '<td>'+parseInt(entfernungskosten)+'</td>'; //Wohnfläche
           tabelle += '<td>'+parseInt(entfernungskosten)+'</td></tr>'; //Grundstück
*/
           //$('#ergebnistabelle tbody').append(tabelle);

					 //$('#resultlistpage').prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(entfernungskosten)+'</dd><dt class="font-s onlyLarge">Gesamt</dt></dl>');

           //
           if(parseInt(entfernungskosten) > 1200){
               //$(e).parent().parent().parent().parent().parent().parent().fadeOut(2000);
           }
       });
            //energiewert
        //$(preis).append('Test');
        //$(this).append(energiewert); //
    });
};

$( document ).ready(function() {
    custom_filter();
});
