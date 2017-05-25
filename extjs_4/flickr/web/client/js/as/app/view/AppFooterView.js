Ext.ns('as.app.view');

(function(){

/**
 * @constructor
 */
as.app.view.AppFooterView = function(cfg){

    as.app.view.AppFooterView.superclass.constructor.call(this,cfg);
};

as.app.view.AppFooterView = Ext.extend (

    Ext.BoxComponent, {

        /**
         * @ignore
         */
        constructor   : as.app.view.AppFooterView,

        /**
         * @private
         * @type Void
         */
        initComponent : function() {

            var defaults = {};

            defaults = Ext.apply(defaults, {
                cls  : 'app-footer',
                unstyled: true,
                data : {
                    info:"Demo Information",
                    desc:"The application allows user to search the Flickr Public Photo feeds.",
                    text:"Key Features: MVC, ExtJS, AJAX, JSONP, Web Service.<br />"
                        +"Technics Lazy Instantiation, Custom Events,"
                        +"OOP, CSS3, XTemplate, Ext Theming, Cross-site Script (among others)"
                },
                tpl: new Ext.XTemplate(
                    '<div class="footer">',
                    '<h3>{title}</h3>',
                    '<p>{text}</p>',
                    '</div>'
                )
            });

            Ext.apply(this,Ext.apply(this.initialConfig,defaults));

            as.app.view.AppFooterView.superclass.initComponent.apply(this,arguments);

        }
    }
);

})();

Ext.reg('app-infofooter',as.app.view.AppFooterView);