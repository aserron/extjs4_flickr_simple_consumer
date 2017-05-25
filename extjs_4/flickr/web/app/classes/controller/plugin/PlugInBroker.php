<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlugInBroker
 * @property ActionStack actionStack
 * @author Andrés Serrón <aserron@gmail.com>
 */
class HelperBroker {

    protected $_helpersByPriority   = array();
    protected $_helpersByNameRef    = array();
    protected $_nextDefaultPriority = 1;

    /**
     * Magic property overloading for returning helper by name
     *
     * @param string $helperName    The helper name
     * @return Zend_Controller_Action_Helper_Abstract
     */
    public function __get($helperName) {
        if (!array_key_exists($helperName, $this->_helpersByNameRef)) {
            return false;
        }
        return $this->_helpersByNameRef[$helperName];
    }

    /**
     * Magic property overloading for returning if helper is set by name
     *
     * @param string $helperName    The helper name
     * @return Zend_Controller_Action_Helper_Abstract
     */
    public function __isset($helperName) {
        return array_key_exists($helperName, $this->_helpersByNameRef);
    }

    /**
     * Magic property overloading for unsetting if helper is exists by name
     *
     * @param string $helperName    The helper name
     * @return Zend_Controller_Action_Helper_Abstract
     */
    public function __unset($helperName) {
        return $this->offsetUnset($helperName);
    }

}

?>
