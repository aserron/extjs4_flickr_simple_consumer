<?php

class InputSanitize {
    // sanitization 
    
    static function sanitizeArray($value) {
        
        $value = is_array($value) ? 
                    array_map(array('InputSanitize', 'sanitizeArray'), $value) : 
                    stripslashes($value); 

        return $value; 
    }
    static function sanitizeVariables($item, $key) 
    {   
        if (!is_array($item)) 
        { 
            $item = stripslashes($item); 
            //$item = self::sanitizeText($item); 
        } 
        
        return $item;
    } 

    // does the actual 'html' and 'sql' sanitization. customize if you want. 
    static function sanitizeText($text) 
    { 
        $text = str_replace("<", "&lt;", $text); 
        $text = str_replace(">", "&gt;", $text); 
        $text = str_replace("\"", "&quot;", $text); 
        $text = str_replace("'", "&#039;", $text); 

        // it is recommended to replace 'addslashes' with 'mysql_real_escape_string' or whatever db specific fucntion used for escaping. However 'mysql_real_escape_string' is slower because it has to connect to mysql. 
        $text = addslashes($text); 

        return $text; 
    } 

}

/**
 * Description of Request
 *
 * @author Andrés Serrón <aserron@gmail.com>
 */
class Request {

    public $action     = 'Default';
    
    public $controller = 'App';
    
    public $data       = array();
    
    private $_get      = array();
    private $_post     = array();
    
    /**
     * Internal controller parameters
     * @var array
     */
    public $params = array();
    
    private $_dispatched = false;
    
    public function __construct($config=null) {

        if($config===null){

            $config = $_POST;
        }
        
        $this->sanitize();

        $this->action = $config['action'];
        $this->data   = json_decode($config['data']);

        // handler ext.pagin settings.
        $this->pager  = new stdClass();
        $this->pager->start = isset ($config['start']) ? $config['start'] : 0;
        $this->pager->limit = isset ($config['limit']) ? $config['limit'] : 10;
        
    }
    
    /**
     * Sanitize POST and GET arrays
     */
    public function sanitize(){
        
        if((function_exists("get_magic_quotes_gpc") && get_magic_quotes_gpc())    || (ini_get('magic_quotes_sybase') && (strtolower(ini_get('magic_quotes_sybase'))!="off")) ){ 
                        
            foreach ($_POST as $key => &$value) {
                    $value = InputSanitize::sanitizeVariables($value, $key);
            }
            
            foreach ($_GET as $key => &$value) {
                    $value = InputSanitize::sanitizeVariables($value, $key);
            }
        } 
    }
            
    public function isDispatched() {
        return ($this->_dispatched === true);
    }
    public function setDispatched($v){
        $this->_dispatched = $v;
    }
}

?>
