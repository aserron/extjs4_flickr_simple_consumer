Ext.ns('as.app.view.flickr');
as.app.view.flickr.FlickrPanel = function(cfg){

    this.model = cfg.model;
    
    as.app.view.flickr.FlickrPanel.superclass.constructor.call(this,cfg);
};
as.app.view.flickr.FlickrPanel = Ext.extend( Ext.Panel,{
    constructor     : as.app.view.flickr.FlickrPanel,
    initComponent   : function(){
        var defaults = {};
        
        defaults = Ext.apply(defaults, {
            // title       :'flick',
            // anchor      : "-2 -2",
            autoScroll: true,
            padding : "14px 0px 0px 0px",
            defaults: {
                model : this.model
            },
            items:[{
                    itemTemplate: as.app.view.flickr.FlickrDataViewTpl,
                    cls     : 'flickrlist',
                    store   : this.model.models.flickr.store,
                    xtype   : 'app-flickrlistview'
            }]

        });
        Ext.apply(this, Ext.apply(this.initialConfig,defaults));
        
        as.app.view.flickr.FlickrPanel.superclass.initComponent.apply(this,arguments);
    }
})

Ext.reg('app-flick-panel',as.app.view.flickr.FlickrPanel);