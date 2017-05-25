Ext.ns('as.app.view');
(function(){
/**
 * @constructor
 */
as.app.view.AppCardPanel = function(cfg){

    this.model = cfg.model;
    
    as.app.view.AppCardPanel.superclass.constructor.call(this,cfg);
};

as.app.view.AppCardPanel = Ext.extend (

    Ext.Panel, {

        /**
         * @ignore
         */
        constructor   : as.app.view.AppCardPanel,

        /**
         * @private
         * @type Void
         */
        initComponent : function() {

            var defaults = {};

            defaults = Ext.apply(defaults, {
                
                layout          : 'card',
                minWidth        :938,
                defaults        :{
                    model           : this.model,
                    border          : false,
                    bodyBorder      : false
                },
                items  :[{
                        ref     : 'flickr',
                        xtype   : 'app-flick-panel'
                },{
                    xtype   :'panel',
                    items   :[{
                            xtype   :'box',
                            autoEl  :{
                                tag     :'div',
                                cls     :'loader'
                            }
                    }]
                    
                }]
            });

            Ext.apply(this,Ext.apply(this.initialConfig,defaults));

            as.app.view.AppCardPanel.superclass.initComponent.apply(this,arguments);
        },

        ////////////////////////////////////////////////////////////////////////
        // custom event
        onRender : function(){
            
            as.app.view.AppCardPanel.superclass.onRender.apply(this,arguments);
            
            this.flickr.model.on({
                scope       :   this,
                beforeload  :   function(){
                    this.layout.setActiveItem(1);
                },
                loadexception    : function(){
                    this.layout.setActiveItem(0);
                }
            })

            this.flickr.on({
                scope       :   this,

                load        : function(){
                    this.layout.setActiveItem(0);
                },
                target      : this.flickr.getComponent(0)
            })
        }
    }
);

})();

Ext.reg('app-cardpanel',as.app.view.AppCardPanel);