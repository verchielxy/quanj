<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/video','MainController@video')->name('video');
Route::get('/design','MainController@design')->name('design');
Route::get('/download','MainController@download')->name('download');
Route::get('/production','MainController@production')->name('production');
Route::get('/supply','MainController@supply')->name('supply');
Route::get('/supply/item_{num}','MainController@item')->name('item');
Route::get('/supply2','MainController@supply2')->name('supply2');
Route::get('/cooperate','MainController@cooperate')->name('cooperate');
Route::get('/partner','MainController@partner')->name('partner');
Route::get('/contactus','MainController@contactus')->name('contactus');
Route::get('/','MainController@index')->name('index');
