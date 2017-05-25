Ext.ns('as.base.list');

as.base.list.BaseListView = function(cfg){
    this.model       = cfg.model;
    this._components = new Ext.util.MixedCollection();
    as.base.list.BaseListView.superclass.constructor.call(this,cfg);
    this.initialize();
};

as.base.list.BaseListView = Ext.extend (

    Ext.DataView, {

        _className     : 'BaseListView',

        autoDestroy   : false,
        autoScroll    : false,

        highlited     : undefined,

        _hlStartColor  : 'ffffff',
        _hlEndColor    : 'f1f2fa',

        hlStartColor    : '5e7184',
        hlEndColor      : '869cb4',


        toString      : function(){
            return String.format("[BaseListView {0}]",this.id);
        },

        constructor     : as.base.list.BaseListView,
        initialize      : function(cfg){
            
        },
        itemTemplate    : undefined,
        initTemplates   : function(){
            var emptyTpl =  new Ext.XTemplate(

                '<div class="project">',
                '<div class="noresult">',
                '<h3>List Title</h3>',
                '<p>No results</p>',
                '</div>',
                '<div id="cisco"></div>',
                '</div>'
                ,{
                    compiled:true
                });
            this.emptyTpl = emptyTpl;

            var propertyTpl =  new Ext.XTemplate(
                '<div class="project-property">',
                    '<span class="pname">{property}:</span><span>{value}</span>',
                '</div>'
                );
            propertyTpl.compile();

            this.itemTemplate = new Ext.XTemplate(
                '<div class="item-over" ></div>',
                '<div class="dataview-list">',
                // '<h2 class="title txt-decorated icon-circle">Results</h2>',
                '<div class="items">',
                    '<tpl for=".">',
                        '{[this.renderItem(values)]}',                                            
                    '</tpl>',
                    '<div class="x-clear"></div>',
                '</div>',
                '</div>'
                ,{
                    compiled     : true,

                    itemTpl      : this.itemTemplate,
                    
                    renderItem:function(values){
                        // return as.base.list.BaseListItemTpl.apply(values);
                        return this.itemTpl.apply(values);
                    },
                    test        : function(){
                        // console.info(this,arguments);
                        return true;
                    }
                });
            this.itemTemplate.compile();
        },
        initComponent   : function(){

            if(!this.model){
                throw ('BaseListView: no model');
            }

            this.initTemplates();

            var defaults = {};



            defaults = Ext.apply(defaults, {
                //bodyStyle   :'project-cardpanel',

                // id:'projectListPanel',
                // autoScroll  : true,
                
                anchor      : "-2 -2",

                store       : this.store || this.model,
                tpl         : this.itemTemplate,

                // multiSelect : false,
                singleSelect: true,
                trackOver   : true,
                overClass   :'x-view-over',
                itemSelector:'.item',
                emptyText   : this.emptyTpl.apply()

                // events
                //*
                ,
                bubbleEvents:['click','activate']
            //,stateEvents :['click']
            // */

            });

            defaults.itemTemplate = defaults.itemTemplate || as.base.list.BaseListItemTpl;

            Ext.apply(this, Ext.apply(this.initialConfig,defaults));

            as.base.list.BaseListView.superclass.initComponent.apply(this,arguments);            
            
        },
        onRender        : function(ct){
            as.base.list.BaseListView.superclass.onRender.apply(this,arguments);
        },
        onUpdate        : function(){

            as.base.list.BaseListView.superclass.onUpdate.apply(this,arguments);
            this.addDeleteButton();

            this.itemOver = $$('.item-over');

            this.selectRange(0, 0);

        },
        refresh                 :function(){
            as.base.list.BaseListView.superclass.refresh.call(this,arguments);
        },


        handleClick : function(dv,index,node,e){
            var selectedEl,selectedProject;
            this.select(node);
        },
        /**
         * Abstract method.
         * @method
         * @param {Ext.DataView} dv
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Ext.EventObject} e The raw event object
         * @return Void
         */
        onMouseEnter: function(dv, index, node, e){},
        /**
         * Abstract method.
         * @method onMouseLeave
         * @param {Ext.DataView} dv Dataview
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Ext.EventObject} e The raw event object
         * @type Void
         */
        onMouseLeave: function(dv, index, node, e){}
});
Ext.reg('app-baselist',as.base.list.BaseListView);