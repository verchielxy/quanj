@extends('html')


@section('html')
	<section class="section">
		<img class="img-res" src="/imgs/video/1.png" alt="">
		<div class="overlay" style="background-color: rgba(255,255,255,0.75);">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="center">
						<h1 class="m0 font3em">视频教程</h1>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<div class="clearfix mb1em">
				<ul class="clearfix float-ul tab-ul" role="tablist">
				    <li role="presentation" class="active">
				    	<a href="#home" aria-controls="home" role="tab" data-toggle="tab">
				    		速览家教程
				    	</a>
				    </li>
				    <li role="presentation">
				    	<a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
				    		工地实景教程
				    	</a>
				   	</li>
				</ul>
			</div>

			<div class="tab-content">
			    <div role="tabpanel" class="tab-pane fade in active" id="home">
			    	@php
			    		$rows=[
			    			[
			    				'/imgs/video/2.png',
			    				'速览第一课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'速览第二课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'速览第三课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'速览第一课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'速览第二课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'速览第三课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    		];
			    	@endphp
					
					<div class="row">
			    		@foreach($rows as $key => $row)
				    		<div class="col-sm-4">
				    			<div class="px1em py2em">
				    				<div class="clearfix my-thum shadow-shallow">
				    					<img class="img-res" src="{{ $row[0] }}" alt="">
				    					<div class="bg-white p1em center">
				    						<h4>{{ $row[1] }}</h4>
				    						<p>{{ $row[2] }}</p>
				    					</div>
				    				</div>
				    			</div>
				    		</div>
							
							@if( ($key+1)%3==0 )
								</div><div class="row">
							@endif

				    	@endforeach	
			    	</div>
			    </div>

			    <div role="tabpanel" class="tab-pane fade" id="profile">
			    	@php
			    		$rows2=[
			    			[
			    				'/imgs/video/2.png',
			    				'工地第一课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'工地第二课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'工地第三课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'工地第一课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'工地第二课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    			[
			    				'/imgs/video/2.png',
			    				'工地第三课',
			    				'这里是课程描述这里是课程描述这里是课程描述这里是课程描述',
			    			],
			    		];
			    	@endphp
					
					<div class="row">
			    		@foreach($rows2 as $row)
				    		<div class="col-sm-4">
				    			<div class="px1em py2em">
				    				<div class="clearfix my-thum shadow-shallow">
				    					<img class="img-res" src="{{ $row[0] }}" alt="">
				    					<div class="bg-white p1em center">
				    						<h4>{{ $row[1] }}</h4>
				    						<p>{{ $row[2] }}</p>
				    					</div>
				    				</div>
				    			</div>
				    		</div>

				    		@if( ($key+1)%3==0 )
								</div><div class="row">
							@endif
				    	@endforeach	
			    	</div>
			    </div>
			</div>
		</div>
	</section>
@endsection



@push('css2')
	<style type="text/css" media="screen">
		
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$(function(){
		
	});
	</script>
@endpush