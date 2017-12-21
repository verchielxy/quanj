@extends('html')


@section('html')
	<section class="section">
		<img class="img-res" src="/imgs/download/1.png" alt="">
		<div class="overlay bg-white70">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="center" style="margin-top: -8em;">
						<img class="mb3em" width="150" src="/imgs/logo2.png" alt="">
						<div class="clearfix mb2em">
							<a class="btn btn-download" href="">软件下载</a>
						</div>
						<div class="clearfix">
							最新版本：10.1.5 <span class="mx5px">|</span> 更新时间：2017-11-15
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">配置要求</h4>
			<img class="img-res" src="/imgs/download/2.png" alt="">
		</div>
	</section>
	
	<section class="section py2em">
		<div class="container">
			<h4 class="title">相关下载</h4>
			<div class="clearfix center py5em">
				<div class="btn-group" role="group" aria-label="...">
				    <a type="button" class="btn btn-default py1em px2em font2em" href="#">
				    	运行软件库
				    </a>
				    <a type="button" class="btn btn-dgray py1em px1em font2em" href="#">
				    	免费下载
				    </a>
				</div>
			</div>
		</div>
	</section>

@endsection



@push('css2')
	<style type="text/css" media="screen">

	.btn-default{
		background-color: #ffffff;
	}
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$(function(){
		
	});
	</script>
@endpush