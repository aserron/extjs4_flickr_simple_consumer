<?php

/**
 * 
 * Front Controller
 * 
 * @todo implement view to handle headers and other kind of outputs
 * 
 */
class FrontController {    
    
    static private $_instance;
    /**
     * @static
     * @return FrontController
     */
    public static function getInstance()
    {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
 
        return self::$_instance;
    }
    
    private $_response;
    private $_request;
    
    private $_returnResponse = true;
    
    /**
     * 
     * @var ActionController[]
     */
    private $_controllers    = array();
    
    /**
     * @constructor
     * @return FrontController
     */
    public  function __construct() {
        // install filters and plug ins
    } 
    
    private function route      (Request $request){
        
        $arr     = explode('.',$request->action);
        
        if (count($arr)>1){
            $request->controller = $arr[0]."Controller";
            $request->action     = $arr[1];
        }
    }
    
    /**
     * Dispatch an action based on the request passed.
     * @param Request $request
     * @param Response $response
     * @return type 
     */
    public  function dispatch   (Request $request,Response $response=null){
        
        // FB::group("[".__METHOD__."] dispatch: $request->action");
        
        $this->route($request);
        
        if($response==null) $response = new Response();
            
        
        // register request and response here and at plugs
        $this->setRequest($request);
        $this->setResponse($response);

        do {
            $request->setDispatched(true);
                
            $this->preDispatch($request);

            /**
             * Skip requested action if preDispatch() has reset it
             */
            if(!$this->getRequest()->isDispatched()){
                continue;
            };
            
            fb($request,__METHOD__);
            fb($response,__METHOD__);
            
            try {
                $controller = $this->getController($request,$response);                
                $controller->dispatch($request,$response);
            } catch (Exception $exc) {
                    // FB::groupEnd();
                    // FB::groupEnd();
                    fb($exc);
                    fb($controller);
                $o = DataRecord::createErrorOutSt();
                $o['data'] = $exc;
                $response->loadData($exc);
            };

            /**
             * zend post dispatch with the plugin broker.
             */
            $this->postDispatch($request);
            
        } 
        while (!$request->isDispatched());
        
        if ($this->returnResponse()) {
                return $this->getResponse();
        }
        $this->getResponse()->sendResponse();
        
        // FB::groupEnd();
    }
    /**
     *
     * @param Request $request 
     * @internal
     * Both pre and post should be done by the plug in broker.
     */
    private function preDispatch (Request $request){
        ActionStack::getInstance()->preDispatch($request);
    }
    private function postDispatch(Request $request){
        ActionStack::getInstance()->postDispatch($request);
    }
    
    
    /**
     *
     * @param Request $request
     * @param Response $response
     * @return ActionController
     */
    private function createControllerInstance(/*Request*/ $request,/*Response*/ $response){
        
        $class = $request->controller;
        $c1    = class_exists($class);
        
        if($c1===false){
            
            throw new RuntimeException("class = '$class' can't be found by autoloader");
        } else {
            $request  = $this->getRequest();
            $response = $this->getResponse();
            
            $controller = new $class($request,$response);
       
            return $controller;
        }
         

            
    }
         
       
     /**
     * @internal This is work for the Dispacher class
     * @param Request $request
     * @return ActionController
     */
    public  function getController(Request $request,Response $response) {
        
        
        if(!array_key_exists($request->controller,$this->_controllers)){
            
            try {
                $controller = $this->createControllerInstance($request, $response);                      
                $this->_controllers[$request->controller] = $controller;                

            } catch (Exception $exc) {

                fb($exc);
            }
            
        }
        
        return $this->_controllers[$request->controller];                

       
    }
    
    /**
     * Set request here and at plug ins.
     * @todo review helper broker at zend
     * @param Request $request 
     */
    public  function setRequest (Request $request){
         $this->_request = $request;
         ActionStack::getInstance()->setRequest($request);
         
         
     }
    public  function setResponse(Response $response){
         $this->_response = $response;
         ActionStack::getInstance()->setResponse($response);
    }

    /**
     * Pass Boolean to set.
     * Otherwise get.
     * @param boolean $flag
     * @return FrontController||boolean front as setter, boolean as getter.
     */
    public  function returnResponse($flag = null) {
        if (true === $flag) {
            $this->_returnResponse = true;
            return $this;
        } elseif (false === $flag) {
            $this->_returnResponse = false;
            return $this;
        }

        return $this->_returnResponse;
    }

    /**
      *
      * @return Request
      */
    public  function getRequest(){
         return $this->_request;
     }
    /**
      *
      * @return Response
      */
    public  function getResponse(){
         return $this->_response;
     }
}
?>