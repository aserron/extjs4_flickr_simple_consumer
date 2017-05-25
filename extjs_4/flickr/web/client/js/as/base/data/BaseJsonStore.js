Ext.ns('as.base.data.');
/**
 * @constructor
 */
as.base.data.BaseJsonStore = function(cfg){
    
    // this.addEvents({});
    
    cfg = cfg || {};
    
    // fixed
    Ext.applyIf(cfg,{        
        url         : '../app/bridge.php'
    });
    
    // defaults
    Ext.applyIf(cfg,{
        
        autoDestroy : true,
        autoLoad    : true,
        
        baseParams  : {},
        
        
        
        fields      : [
            {name:'id',type:'int'}
        ]
    });
    
    Ext.applyIf(cfg.baseParams,{
        action : 'ping',
        data   : {}
    });    
    
    
    // configure reader
    cfg = Ext.apply(cfg,{        
            idProperty      : 'id',
            root            : 'data',
            totalProperty   : 'total'
    });
    
    cfg = Ext.apply(cfg,{
        reader : new Ext.data.JsonReader(cfg)
    });

    cfg.listeners = cfg.listeners || {};
    // console.info("%s.constructor: create",this,this.storeId);
    
    as.base.data.BaseJsonStore.superclass.constructor.call(this, cfg);    

    this.on({
        scope       : this,
        beforeload  : function(){            
            if(App.shutingDown) {
                // console.warn("%s. shuting down",this,arguments);
                return false;
            }
        }
    })

    
};

as.base.data.BaseJsonStore = Ext.extend(
    Ext.data.Store, {
        toString   : function(){            
            return String.format('[{0}]',"as.base.data.BaseJsonStore");
        },
        constructor: as.base.data.BaseJsonStore
});
Ext.reg('basejsonstore',as.base.data.BaseJsonStore);

