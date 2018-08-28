// ==UserScript==
// @name         immobilienscout24
// @namespace    http://tampermonkey.net/
// @version      0.4
// @downloadURL  
// @description  try to take over the world!
// @author       Dennis Gloger
// @match        https://www.immobilienscout24.de/Suche/*
// @grant        none
// _@require http://code.jquery.com/jquery-1.12.4.min.js
// @run-at document-end
// ==/UserScript==


/*
$.get("https://helpdesk.jtl-software.de/otrs/index.pl?Action=AgentTicketLockedView;Filter=All;View=;SortBy=Age;OrderBy=Up;ChallengeToken=l5xRyoHPaUij7ACEKzB4pJI2wWMDykJH;ColumnFilterState=4;", function(data, status){
    if($(data).find('.MasterAction').length > 0){
        $('#ToolBar').append('<li><a href="https://helpdesk.jtl-software.de/otrs/index.pl?Action=AgentTicketLockedView;Filter=All;View=;SortBy=Age;OrderBy=Up;ChallengeToken=l5xRyoHPaUij7ACEKzB4pJI2wWMDykJH;ColumnFilterState=4;"><i class="fa fa-lock"></i><span class="Counter">'+$(data).find('.MasterAction').length+'</span></a></li>');
    }
*/
function custom_filter(){
    var energiewert = '123';
    var preis = '123';
    var preis2 = '123';
    var gesamtpreis = '123';
    var quadradmeter = '123';
    var entfernungskosten = '123';
    $('.result-list-entry__data > a').each(function(blubb,e){

       //$.get($(this).attr('href')), function(data){
       $.get($(this).attr('href'), function(data, status){
           preis = $(e).parent().children().children().children().children('.result-list-entry__primary-criterion:first').children('dd');
           preis2 = preis.text().replace('€','').replace('.','');

           quadradmeter = $(e).parent().children().children().children().children('.result-list-entry__primary-criterion:nth-child(2)').children('dd').text();

           if($(data).find('.is24qa-endenergiebedarf').length > 0){
               energiewert = $(data).find('.is24qa-endenergiebedarf').text();
           }else{
               energiewert = '150';
           }
           energiewert = energiewert.replace(' kWh/(m²*a)','')
           energiewert = (parseFloat(energiewert) * parseFloat(quadradmeter)) / 12 / 11;
           //console.log(quadradmeter);
           $(e).next().append(parseInt(energiewert));
           preis2 = (parseInt(preis2)+25000) / 250;
           preis2 = parseInt(preis2) + parseInt(energiewert);
           $(preis).append('<br />ca.: '+ preis2);

           entfernungskosten = $(e).next().children('div:first').text().replace(' km|','');
           entfernungskosten = (parseFloat(entfernungskosten) * 40) * 0.3;
           $(preis).append('<br />Farkost.: '+ parseInt(entfernungskosten));
           entfernungskosten = parseFloat(entfernungskosten) + parseInt(preis2);
           $(preis).append('<br />Gesamt.: '+ entfernungskosten);
           if(entfernungskosten > 1200){
              // $(e).parent().parent().parent().parent().parent().parent().fadeOut(2000);
           }
       });
            //energiewert
        //$(preis).append('Test');
        //$(this).append(energiewert);
    });
};

$( document ).ready(function() {
    custom_filter();
});