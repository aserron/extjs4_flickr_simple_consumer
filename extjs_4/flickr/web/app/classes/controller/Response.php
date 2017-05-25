<?php
/**
 * Description of Response
 *
 * @author Andrés Serrón <aserron@gmail.com>
 */
class Response {
    //put your code here
    public $success = false;
    public $total   = 0;
    public $data    = array();
    public $error   = '';
    
    public function loadData($o){        
        $o = (array) $o;
        foreach ($o as $key => $value) {            
            if(property_exists($this, $key)){
                $this->{$key} = $value;
            }
        }
    }
    
    /**
     * @todo Implement view out from inside the Front controller calling this function
     */
    public function sendResponse(){
        // implemenet based on the zend framework implementation.
    }
}

?>
