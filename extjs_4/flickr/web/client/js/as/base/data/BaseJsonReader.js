/**
 * @namespace as.base.data.
 */
Ext.ns('as.base.data');
as.base.data.BaseJsonReader = Ext.extend(
    Ext.data.JsonReader,{
        constructor: function(meta,recordType){
            // console.warn("base json reader",this);
            meta = meta || {};

            meta = Ext.apply( meta, {
                idProperty      : 'id',
                successProperty : 'success',
                totalProperty   : 'total',        
                messageProperty : 'message',
                root            : 'data'
            });

            /*
            if((recordType === undefined)&&(!meta.fields)){
                meta.fields = [];
            }*/
            as.base.data.BaseJsonReader.superclass.constructor.call(this, meta,recordType || meta.fields);
        }
});
Ext.reg('basejsonreader',as.base.data.BaseJsonReader);

