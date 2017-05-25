Ext.ns('as.app.view');

(function(){

/**
 * @constructor
 */
as.app.view.AppListPanel = function(cfg){

    this.model = cfg.model;

    as.app.view.AppListPanel.superclass.constructor.call(this,cfg);
};

as.app.view.AppListPanel = Ext.extend (

    Ext.grid.GridPanel, {

        /**
         * @ignore
         */
        constructor   : as.app.view.AppListPanel,

        /**
         * @private
         * @type Void
         */
        initComponent : function() {
            
            var myData = [
              ['> Tags','noaction',''],
              ['Recent','recent',''],                      
              ['Trees','tag','tree'],
              ['Custom','custom','']
            ];

            var store = new Ext.data.Store({
                autoLoad    : true,
                proxy       : new Ext.data.MemoryProxy(myData),
                reader      : new Ext.data.ArrayReader({}, [
                    {name: 'title'},
                    {name: 'action'},
                    {name: 'tags'}
                ])
            });
            

            
            var defaults = {};

            defaults = Ext.apply(defaults, {

                cls         : 'app-list',
                store       : store,
                colModel    : new Ext.grid.ColumnModel({
                    defaults    : {
                        width       : 120,
                        sortable    : true
                    },
                    columns: [
                        {
                            id: 'list-title',
                            header: false,
                            width: 200,
                            sortable: true,
                            dataIndex: 'title'
                         },
                        {header: 'tags',dataIndex:'tags',hidden:true}
                    ]
                }),
                viewConfig	: {
                    forceFit        : false ,
                    showPreview     : true, // custom property
                    enableRowBody   : true, // required to create a second, full-width row to show expanded Record data
                    getRowClass     : function(record, rowIndex, rp, ds){ // rp = rowParams
                        if(rowIndex==0){
                            return 'x-grid3-row-nostyle';
                        }
                        return 'x-grid3-row-styled';
                    }
                },
                bubbleEvents        :['loadflickr']
            });

            Ext.apply(this,Ext.apply(this.initialConfig,defaults));

            as.app.view.AppListPanel.superclass.initComponent.apply(this,arguments);

            this.addEvents({

                /**
                 * @event
                 * @param {AppListPanel} view
                 * @param {string}       action
                 * @param {string}       tagas 
                 */
                loadflickr : true
            });

            this.getSelectionModel().on({
                scope           : this,
                rowselect       : function(sm,i,rec){
                    // console.warn("%s.select",this,arguments);
                    if(rec.get('action')!='custom'){
                        this.fireEvent('loadflickr',this,rec.get('action'),rec.get('tags'))
                    }
                    
                },
                beforerowselect :function(sm,i,keep,rec){
                    if(i==0) return false;
                }

            })


           
            
        },

        ////////////////////////////////////////////////////////////////////////
        // custom event
        onRender : function(){
            as.app.view.AppListPanel.superclass.onRender.apply(this,arguments);

            this.addListener('viewready',function(){
                this.getSelectionModel().selectRow(1);

                this.model.on({
                    scope       : this,
                    flickrload  : function(model,action,recs){
                        // console.warn("%s. handle flickr load in list",this,arguments);
                        if(action=='custom'){
                            this.getSelectionModel().selectRow(3);

                        }
                    }
                })
            },this);
        }
    }
);
Ext.reg('app-listgrid',as.app.view.AppListPanel);
})();