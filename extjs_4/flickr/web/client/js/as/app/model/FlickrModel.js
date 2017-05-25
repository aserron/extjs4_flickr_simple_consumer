Ext.ns("as.app.model");
as.app.model.FlickrModel = function(cfg){

    this.initialize();

    as.app.model.FlickrModel.superclass.constructor.call(this,cfg);
}
as.app.model.FlickrModel = Ext.extend( Ext.util.Observable,{

    constructor : as.app.model.FlickrModel,

    initialize : function(){
        this.store = new Ext.data.Store({
            autoLoad    : false,
            proxy       : new as.base.flickr.FlickrProxy({
                url         : 'http://api.flickr.com/services/feeds/photos_public.gne',
                method      : 'GET',
                params      : {
                    per_page: 4,
                    tags    :'tree'
                }
                
            }),
            reader: new as.base.flickr.FlickrPhotoReader()
        });

        this.addEvents({
            load: true
        })

        this.relayEvents(this.store,['load']);
        
    },
    load    : function(params,action){
        action = action || 'recent';
        params = params || {};
        this.store.load({
            action : action,
            params : params
        });
    }

})