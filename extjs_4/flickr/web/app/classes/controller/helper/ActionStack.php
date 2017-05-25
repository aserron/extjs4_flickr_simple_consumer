<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ActionStack
 *
 * @author Andrés Serrón <aserron@gmail.com>
 */
class ActionStack {
    
    /**
     * @var ActionStack
     */
    static $_instance;
    /**
     *
     * @return ActionStack
     */
    public static function getInstance()
    {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
 
        return self::$_instance;
    }
    
    /**
     *
     * @var FrontController
     */
    private $_front;
    /**
     *
     * @var ActionController
     */
    private $_current;
    
    private $_request;
    private $_response;
    
    /**
     * @var Request[]
     */
     private $_stack  = array();
     
     
     public function __construct() {
        $this->_front = FrontController::getInstance();
     }     
     /**
      *
      * @param Request $request
      * @return integer The new stack count 
      */
     public function push(Request $request){
         return array_unshift($this->_stack,$request);
     }     
     /**
      * Pop the last request
      * @return Request 
      */
     public function pop(){
        return array_pop($this->_stack);
     }
     
     public function &getStack(){
         return $this->_stack;
     }
     public function getCount(){
         return count($this->_stack);
     }     
     ///////////////////////////////////////////////////////////////////////////
     // should match current exucted
     public function setRequest(Request $request){
         $this->_request = $request;
     }
     public function setResponse(Response $response){
         $this->_response = $response;
     }     
     /**
      *
      * @return Request
      */
     public function getRequest(){
         return $this->_request;
     }
     /**
      *
      * @return Response
      */
     public function getResponse(){
         return $this->_response;
     }
     
     ///////////////////////////////////////////////////////////////////////////
     // controller workflow     
     public function setActionController(ActionController $ctrl){
         $this->_current = $ctrl;
     }
     public function preDispatch(Request $request){
         $this->setRequest($request);
     }     
     public function postDispatch(Request $request){
         
         if (!$request->isDispatched()) {
            return false;
        }
         
        $this->setRequest($request);
        
        $stack = $this->getStack();
        
        if ($this->getCount()==0) {
            return;
        }
        
        $next = $this->pop();        
        if (!$next||($next===null)) {
            return;
        }
        
        $this->forward($next);
     }
     
     /**
     * @param  Request $next
     * @return void
     */
    public function forward(Request $next)
    {
        $request = $this->getRequest();
        if ($this->getClearRequestParams()) {
            // $request->clearParams();
        }

        
        $request->action     = $next->action;
        $request->controller = $next->controller;
        $request->params     = $next->params;
        $request->setDispatched(false);
        
        // continue dispatch loop >>>
    }    
    public function getClearRequestParams($value=null){
        return false;
    }
}

?>
