<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Action
 *
 * @author Andrés Serrón <aserron@gmail.com>
 */
class ActionController {
    
    /**
     *
     * @var Request
     */
    public $request;
    
    /**
     *
     * @var Response
     */
    public $response;
    
    //put your code here
    public function __construct(Request $request=null,Response $response=null, $invokeArgs=array()) {
        if($request!=null)  $this->setRequest($request);
        if($response!=null) $this->setResponse($response);
    }
    
    
    /**
     * Push a new action into the action stack.
     * Set dispatched to false;
     * @param string $action
     * @param string $controller
     * @param type $invodeArgs 
     */
    public function _queue ( $action, $controller=null,$invodeArgs=array()) {
        $request = new Request();
        $request->action     = $action;
        $request->controller = $controller."Controller";
        $request->params     = $invodeArgs;
        ActionStack::getInstance()->push($request);
    }
    
    /**
     * Forward a new action.
     * Set dispatched to false;
     * @param string $action
     * @param string $controller
     * @param type $invodeArgs 
     */
    public function _forward( $action, $controller=null,$invodeArgs=array()) {        
        
        $this->request->action      = $action;
        $this->request->controller  = $controller."Controller";
        $this->request->args        = $invodeArgs;        
        
        $this->request->setDispatched(false);
    }
    
    public function dispatch(Request $request=null,Response $response=null){
        
        if($request)  $this->setRequest($request);
        if($response) $this->setResponse($response);
        
        $this->preDispatch();        
        
        $request->setDispatched(true);
        $this->{$request->action}($request->data);        
        
        $this->postDispatch();
        
    }
    
    /**
     * Override to gain pre dispatch logic.
     * Note:
     * The action could be skipped by fowarding from here based on some 
     * test.
     */
    protected function preDispatch(){
        $stack = ActionStack::getInstance();
    }
    
    /**
     * Override to add post dispatch functionallity
     */
    protected function postDispatch(){
        
    }
    
    public function setRequest($request){
        $this->request = $request;
    }
    public function getRequest(){
        return $this->request;
    }
    public function setResponse($response){
        $this->response = $response;
    }
    public function getResponse(){
        return $this->response;
    }
}

?>
