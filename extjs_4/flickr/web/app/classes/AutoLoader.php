<?php

class AnythingButPhpFilterSimple extends FilterIterator {
    
    protected $exclude = array(
        '.svn',
        '_lib',
        'test',
        // 'client',
        'components'
    );
    protected $limit = 1000;

    public function __construct( $recursiveIter) {        
        parent::__construct($recursiveIter);
    }
    public function accept() {
        return  $this->isValid();
    }
    
    /**
     * True when the current element is valid
     * @return boolean 
     */
    public function isValid(){
        
        if(parent::valid()){
            
            $current = $this->current();
        
            $no = array('all-wcprops','svn-base');

            $c1 = (strpos($current->getPathname(),$no[0])===false);
            $c2 = (strpos($current->getPathname(),'svn')===false);
            $c3 = (strpos($current->getPathname(),'php')!==false);

            return $c1 && $c2 && $c3;
            
        } else {
            
            return false;
        }
    }
    
    /**
     *
     * @return RecursiveDirectoryIterator
     */
    public function current(){
        return parent::current();
    }
}

/**
 * Autoloader Handler.
 * - cache file real path indexing by filename
 * - load all atf php folders as SPL Iterators.
 * - allow .class.php extension
 *
 * @author Andrés Serrón <aserron@gmail.com>
 */
class AutoLoader { 
    
    private static $_instance;
    
    /**
     * @return AutoLoader
     */
    public static function &getInstance() {        
        if(!(self::$_instance instanceof self) ) {
            
            self::$_instance = new self();
            self::$_instance->initialize();
            
            return self::$_instance;
            
        } else {
            
            return self::$_instance;
        }

    }
    ////////////////////////////////////////////////////////////////////////////
    // isntance
    public  $debug     = false;
    
    /**
     *
     * @var AnythingButPhpFilterSimple
     */
    private $recDirItr = null;    
    
    public  $cache   = array();
    
    /**
     * Create a new AutoLoader instance.
     */
    public  function __construct() {        
        if($this->debug){
            fb(__METHOD__." created");        
            fb($this->cache,__METHOD__.": cached at constructor");
        }
        
    }
    
    /**
     * @todo Persist across session
     */
    public function __destruct() {        
        $this->cache = array();
    }
    
    private  function initialize() {
        
        if($this->debug) {            
            FB::group(__METHOD__,array('Collapsed'=>true));
            fb(__METHOD__,"INFO");                    
        }
        
        $this->initClassPathCache();
        
        if($this->debug) FB::groupEnd();
    }
    
    private function initClassPathCache() {
        $dir = $this->getDirectoryList();
        $count = 0;
        $max   = 100;
        
        if($this->debug) FB::group(__METHOD__,array('Collapsed'=>true));
        
        if($this->debug) fb("Walk the itereator: keys are full paths!","WARN");        
        foreach ($dir as $key => $fileInfo) {
            if($this->debug) fb($fileInfo->getRealPath(),"key = $key");            
            $this->cache[$key] = $fileInfo->getRealPath();
        }        
        if($this->debug) FB::groupEnd();
    }
    
    /**
     * Register autoloader method.
     */
    public  function register() {
        fb(__METHOD__." > Installing autoloader","WARN");
        if(false === spl_autoload_register(array($this, 'loader'))){
            fb("SPL ERROR","ERROR");
            die("can't register autoloader");
        };
    }
    
    /**
     * Try to include the file for the Class Name passed.
     * @param string $className Class Name to be included.
     */
    public function loader($className) {
        
        $path = $this->findClassRealPathByName($className);        
            
        if($path!==false){
            
            if($this->debug) fb(__METHOD__." > Loading class='$className' realpath='$path'","WARN");
            
            $this->cache[] = $className;            
            
            include_once $path;
            
        } else {
            
            throw new LogicException("Can't find the real path for class name ='$className'");
        }
    }
    
    /**
     * Get the autoloader base directory
     * @return string
     */
    public  function getBaseDirectoryRealPath() {
        $path[] = realpath('.');
        $path[] = 'classes';
        $fullpath = implode(DIRECTORY_SEPARATOR,$path);
        return $fullpath;
    }
    
    
    /**
     * Get the recursive directory iterator with only php file into it.
     * The method create the object if needed.
     * The iterator is filtered with an AnythingButPhpFilter instance.
     * @param boolean $force Force rebuild.
     * @return AnythingButPhpFilterSimple
     */
    public function getDirectoryList($force=false){
        
        if(($this->recDirItr==null) || $force){
            
            $directoryPath      = $this->getBaseDirectoryRealPath();
        
            if($this->debug) fb(realpath($directoryPath),__METHOD__.": Creando dir=$directoryPath","INFO");
            
            // /*
            $directory   = new RecursiveDirectoryIterator($directoryPath,
                RecursiveDirectoryIterator::NEW_CURRENT_AND_KEY
            );
            // $directory->setFlags(RecursiveDirectoryIterator::NEW_CURRENT_AND_KEY);
            
            $recursive   = new RecursiveIteratorIterator($directory,RecursiveIteratorIterator::SELF_FIRST);
            $filtered    = new AnythingButPhpFilterSimple($recursive);            
            $itr         = $filtered;
            // */
            $this->recDirItr = $itr;
            
        };
        return $this->recDirItr;
    }
    
    /**
     * Try to find the real path of the class name passed.
     * 
     * The file must be named after the class name with optional .class
     * sufix
     * 
     * throw LogicException if nothing found.
     * 
     * @param string $className Real path to class file.
     */
    private function findClassRealPathByName($className){
        
        if($this->debug) fb(__METHOD__." > find class ='$className'","INFO");
        
        $fileName1 = $className.".php";
        $fileName2 = $className.".class.php";        
        foreach ($this->cache as $fileName => $fileRealPath) {            
            if(($fileName == $fileName1)||($fileName == $fileName2)){
                return $fileRealPath;
            } else {
                continue;
            }
        }           
        return false;
    }   
}
?>
