/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('as.app.view');
(function(){
    as.app.view.AppView = Ext.extend(Ext.Viewport,{

        constructor     :function(cfg){
            cfg        = cfg || {};

            this.addEvents({

                /**
                 * @event
                 * @param {Type} param1 Parameter
                 */
                action      : true,

                /**
                 * @event
                 * @param {AppView} view
                 * @param {string} action   Type of search
                 * @param {string} tags     Tag list string.
                 */
                loadflickr  : true
            });
            
            this.model = cfg.model;

            as.app.view.AppView.superclass.constructor.call(this,cfg);
        },

        initEvents      :function(){

            var model_lst = (function(model){
                return {
                    scope       : model,
                    loadflickr  : function(view,action,tags){
                        var params = Ext.apply({},{
                            tags : tags
                        })
                        model.models.flickr.load(params,action);
                    }
                }
            })(this.model);

            this.on(model_lst);
        },
        initComponent   :function(){

            var defaults = {};

            defaults = Ext.apply(defaults, {
                //renderTo: Ext.getBody(),                                
                layout      : 'border',
                minWidth    : 1136,
                defaults    : {
                    model       : this.model,
                    border      : false,
                    bodyBorder  : false
                },

                items:[{
                        region      : 'north',
                        xtype       : 'app-topbarview'
                        
                },{
                        model       : this.model,
                        width       : 200,
                        region      :'west',
                        xtype       :'app-listgrid'
                },{
                        
                        minSize     :938,
                        activeItem  : 0,
                        xtype       : 'app-cardpanel',
                        region      : 'center'
                },{
                        xtype       : 'app-infofooter',
                        region      : 'south',
                        height      : 80
                }
                ]
            });

            Ext.apply(this,Ext.apply(this.initialConfig,defaults));

            as.app.view.AppView.superclass.initComponent.apply(this,arguments);

            this.initEvents();

        },
        onRender        :function(){
            Ext.get('loading').remove();
            as.app.view.AppView.superclass.onRender.apply(this,arguments);
            this.fireEvent('loadflickr',this,'recent','');
        }
    });

})();


