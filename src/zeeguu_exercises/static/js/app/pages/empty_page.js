/**
 * Created by Martin on 5/14/2017.
 */
import $ from 'jquery';
import {Loader} from "../loader";
import Mustache from 'mustache';

var EmptyPage = function(newFields = null){
    this.init(newFields);
};

EmptyPage.prototype = {

    /************************** SETTINGS ********************************/
    emptyTemplateURL: 'static/template/empty_page.html',
    templateFields:
        {
            icon: 'static/img/illustrations/ntd_cloud.png',
            title: "Not Enough Words To Learn",
            info: 'You can get words when you read articles.',
            btnPrime: 'https://www.zeeguu.unibe.ch/reading',
            btnPrimeText: 'Let\'s Read',
            btnSecond: false,
            btnSecondText: 'Skip',
        },
    emptyTemplate: 0,

    /*********************** General Functions ***************************/
    /**
     *	Saves the dom
     **/
    cacheDom: function(){
    },

    /**
     * Merges two javascript objects together
     * @param {Object} oldField, the field that will be overwritten
     * @param {Object} newField, the field that provides which properties to override
     * @return {Object} merged field
     * TODO test this
     * */
    mergeField: function (oldField,newField) {
        for (let key in newField) {
            if (newField.hasOwnProperty(key)) {
                oldField[key] = newField[key];
            }
        }
        return oldField;
    },

    /**
     *	Exercise initialaizer
     **/
    init: function(newField){
        if(newField!=null){
            this.templateFields =  this.mergeField(this.templateFields, newField );
        }
        this.start();
    },

    /**
     *	The main constructor
     **/
    start: function (){
        var _this = this;
        $.when(Loader.loadTemplateIntoElem(_this.emptyTemplateURL,$("#main-content"))).done(function(data){
            // Create the DOM and start the generator
            _this.emptyTemplate = data;
            _this.cacheDom();
            _this.genPage();
            _this.bindUIActions();
        });
    },

    genPage: function () {
        let html = Mustache.to_html(this.emptyTemplate,this.templateFields);
        $("#main-content").html(html);
    },

    bindUIActions: function(){
    },

    terminate: function(){
        //If any events terminate here
    },
};

export default EmptyPage;

