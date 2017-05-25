Ext.ns('as.app.model');
(function(){
    /**
     * Features Ext.extend with private members by clouser passed as
     * override object.
     * 
     * @namespace as.app.model
     */
    as.app.model.AppModel = function (){};

    as.app.model.AppModel = Ext.extend( Ext.util.Observable,{
        constructor : function (cfg){

            this.front = cfg.front;

            this.initialize(cfg);

            as.app.model.AppModel.superclass.constructor.call(this,cfg);
        },
        initialize : function (cfg){

            this.addEvents({
                mainload   : true,
                flickrload : true
            })
            
            
            this.models = {};
            
            this.models.flickr = new as.app.model.FlickrModel({
                front : this.front
            })

            this.models.flickr.on({
                scope : this,
                load  : function(ds,recs,opt){
                    var action = opt.action;
                    this.fireEvent('flickrload',this,action,recs)

                }
            })
        }
    });
        
})();


