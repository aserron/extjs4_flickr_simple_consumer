Ext.ns('as.app.view.topbar');

(function(){

/**
 * @constructor
 */
as.app.view.topbar.AppTopbarView = function(cfg){

    this.model = cfg.model;

    as.app.view.topbar.AppTopbarView.superclass.constructor.call(this,cfg);
};

as.app.view.topbar.AppTopbarView = Ext.extend (

    Ext.Panel, {

        /**
         * @ignore
         */
        constructor   : as.app.view.topbar.AppTopbarView,

        /**
         * @private
         * @type Void
         */
        initComponent : function() {

            var defaults = {};

            defaults = Ext.apply(defaults, {
                id          :'thetop',
                cls         :'app-topbar',
                height      : 120,
                padding     :'0px 40px',
                layout      :'hbox',
                layoutConfig:{
                    pack            : 'end',
                    align           : 'middle',
                    defaultMargins  :'10px'
                },
                defaults:{
                    xtype : 'button'
                },
                items:[{
                        xtype   :'label',
                        cls     : 'app-topbar-searchlabel',
                        text    :'write your tags:'
                },{
                        ref         : 'tagField',
                        cls         : 'app-searchfield',
                        width       : 300,
                        fieldLabel  : 'tags',
                        xtype       : 'textfield',
                        listeners: {
                            scope       : this,
                            specialkey  : function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    var tags = field.getValue().trim().replace(' ',',');
                                   if(tags.length>0){
                                        this.searchBtn.disable();
                                        this.fireEvent('loadflickr',this,'custom',tags);
                                    }
                                }
                            }
                        }

                },{
                        xtype   :'app-iconbutton',
                        ref     :'searchBtn',
                        disabled: true,
                        // id   : 'SearchBN',
                        tooltip : 'Click Me',
                        scope   : this,
                        handler : function() {

                            var tags = this.tagField.getValue().trim().replace(' ',',');

                            if(tags.length>0){
                                this.searchBtn.disable();
                                this.fireEvent('loadflickr',this,'custom',tags);
                            }

                            
                        }
                }]
            });

            Ext.apply(this,Ext.apply(this.initialConfig,defaults));

            as.app.view.topbar.AppTopbarView.superclass.initComponent.apply(this,arguments);

            this.enableBubble(['loadflickr']);

            this.model.on({
                scope       : this,
                flickrload  : function(model,action,recs){
                    this.searchBtn.enable();
                }
            })
        }
    }
);

})();
Ext.reg('app-topbarview',as.app.view.topbar.AppTopbarView);