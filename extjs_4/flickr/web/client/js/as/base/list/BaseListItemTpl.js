Ext.ns('as.base.list');
as.base.list.BaseListItemTpl = new Ext.XTemplate(
    '<tpl if="this.test(values)">',
        '<div class="item" id="item_{#}">',
            '<h3 class="title">{title}</h3>',
            '<div class="thumb-wrap" alt="project image" >',
                '<div class="thumb" style="float:left">',
                    '<img width="224" height="143" src="{link}" title="{title}"/>',
                '</div>',
            '</div>',
            '<div class="x-clear"></div>',
        '</div>',        
'</tpl>',
{
    compiled:true,
    test    : function(){
        //console.warn("%s.test values",this,arguments);
        return true;
    }
})