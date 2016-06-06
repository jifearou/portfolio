<?php
/**
 * Project portfolio
 * functions.php
 * 2016.06.06 11:20
 * 
 * @author Domas <sungaila.d@gmail.com>
 */

/**
 * Convert mixed variable to string.
 * @param mixed $var variable
 * @param string $name variable name
 * @param string $tab
 * @param int $key_length variable key space width
 * @param string $before
 * @param string $after
 * @param string $space
 * @param string $super_before
 * @param string $super_after
 * @return string
 */
function var_to_str($var, $name = "unknown var", $tab = "    ", $key_length = 30, $before = "", $after = "\n", $space = " ", $super_before = "", $super_after = "") {
    $str = $super_before;
    $var_type = gettype($var);

    if ($key_length == -1)
        $format = "%s%s{%' -8.8s}";
    else
        $format = "%s%'{$space}-{$key_length}.{$key_length}s{%' -8.8s}";

    switch ($var_type) {
        case 'array':
            if ($name !== false)
                $str .= sprintf("$format (%d):%s", $before, $name, $var_type, count($var), $after);
            foreach ($var as $name => $value) {
                $str .= var_to_str($value, $name, $tab, $key_length, $before . $tab, $after, $space);
            }
            break;
        case 'object':
            $var = get_object_vars($var);
            if ($var == null) {
                $var = "[nenustatyta]";
                $str .= sprintf("$format=%s%s", $before, $name, $var_type, $var, $after);
            } else {
                $str .= sprintf("$format (%d):%s", $before, $name, $var_type, count($var), $after);
                $str .= var_to_str($var, false, $tab, $key_length, $before, $after, $space);
            }
            break;
        case 'string':
            $str .= sprintf("$format=%s%s", $before, $name, $var_type, "'{$var}'", $after);
            break;
        case 'boolean':
            $var = $var ? 'TRUE' : 'FALSE';
            $str .= sprintf("$format=%s%s", $before, $name, $var_type, $var, $after);
            break;
        default:
            $str .= sprintf("$format=%s%s", $before, $name, $var_type, (string)$var, $after);
            break;
    }
    $str .= $super_after;
    return $str;
}

function data_log($data, $name=null) {
    text_log(var_to_str($data, $name));
}

function text_log($message) {
    error_log($message);
//    error_log("<<< " . date('Y-m-d H:i:s') . " >>> " . $message . "\n", 3, dirname(__FILE__) . '/log.txt');
}